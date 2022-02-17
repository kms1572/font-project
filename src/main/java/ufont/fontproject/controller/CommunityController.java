package ufont.fontproject.controller;

import com.google.gson.JsonObject;
import org.apache.commons.io.FileUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ufont.fontproject.domain.Comment;
import ufont.fontproject.domain.CommentDto;
import ufont.fontproject.domain.Post;
import ufont.fontproject.domain.PostDto;
import ufont.fontproject.service.CommentService;
import ufont.fontproject.service.PostService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import static org.springframework.data.domain.Sort.Order.desc;


@Controller
public class CommunityController {

    private final PostService postService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final CommentService commentService;

    public CommunityController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @RequestMapping(value = "post_list", method = {RequestMethod.GET, RequestMethod.POST})
    public String post_list(Model model, @PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<Post> list = postService.postList(pageable);

        model.addAttribute("post_list", list);
        model.addAttribute("check", postService.getListCheck(pageable));
        return "community/post_list";
    }

    @PostMapping("post_input_password")
    @ResponseBody
    public String post_input_password(HttpServletRequest request, Model model) {
//        List<PostDto> postDtoList = postService.getPostList(); //저장된 모든 데이터 가져옴

        String post_password = request.getParameter("post_password"); //입력한 비밀번호

        String postId = request.getParameter("post_pk"); //해당 게시물 id 가져오기

        PostDto getPostData = postService.getPost(Long.valueOf(postId));
        String org_password = getPostData.getPost_password(); //게시물 등록시 비밀번호

        String passcheck = "";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (encoder.matches(post_password, org_password)) {
            passcheck = "true";
        }else{
            passcheck = "false";
        }
        model.addAttribute("passcheck", passcheck);

        return passcheck;
    }


    @GetMapping("post_form")
    public String postForm() {
        return "community/post_form";
    }


    @RequestMapping(value =  "post_form_write")
    public String postFormWrite(PostDto postDto) {
        String post_password = postDto.getPost_password(); //입력한 패스워드
        post_password = encoder.encode(post_password); //패스워드 암호화
        postDto.setPost_password(post_password);
        postService.savePost(postDto); //게시글 저장

        return "redirect:post_list";
    }

    @PostMapping("/valid-recaptcha")
    public @ResponseBody String validRecaptcha(HttpServletRequest request, Model model){
        String result = null;
        String response = request.getParameter("g-recaptcha-response");

        boolean isRecaptcha = postService.verifyRecaptcha(response); //인증 메소드 서비스로 분리

        if(isRecaptcha) {
            result = "true";
        }else {
            result = "false";
        }
        model.addAttribute("result", result);
        return result;
    }

    @PostMapping(value="/uploadSummernoteImageFile", produces = "application/json")
    @ResponseBody
    public JsonObject uploadSummernoteImageFile(@RequestParam("file") MultipartFile multipartFile) {
        // 썸머노트 이미지 따로 저장 (DB 용량 덜 차지)
        JsonObject jsonObject = new JsonObject();

        String fileRoot = "C:\\ufont_summernote_image\\";//저장될 파일 경로
        String originalFileName = multipartFile.getOriginalFilename();//오리지날 파일명
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));//파일 확장자

        // 랜덤 UUID+확장자로 저장될 savedFileName
        String savedFileName = UUID.randomUUID() + extension;

        File targetFile = new File(fileRoot + savedFileName);

        try {
            InputStream fileStream = multipartFile.getInputStream();
            FileUtils.copyInputStreamToFile(fileStream, targetFile);	//파일 저장
            jsonObject.addProperty("url", "/summernoteImage/"+savedFileName);
            jsonObject.addProperty("responseCode", "success");

        } catch (IOException e) {
            FileUtils.deleteQuietly(targetFile);	// 실패시 저장된 파일 삭제
            jsonObject.addProperty("responseCode", "error");
            e.printStackTrace();
        }

        return jsonObject;
    }


    /**
     * 게시글 수정
     */
    @GetMapping("/post_update/{post_pk}")
    public String edit(@PathVariable("post_pk") Long id, Model model) {
        PostDto postDto = postService.getPost(id);
        model.addAttribute("post", postDto.getPost_content());
        model.addAttribute("post_id", postDto.getId());
        model.addAttribute("post_name", postDto.getPost_name());
        model.addAttribute("post_password", postDto.getPost_password());
        return "community/post_update";
    }

    @PutMapping("/post_update/{post_pk}")
    public String postUpdateWrite(@PathVariable String post_pk, PostDto postDto) {
        postService.update(Long.valueOf(post_pk), postDto);
        return "redirect:/post_list";
    }

    /**
     * 게시글 삭제
     */
    @GetMapping("/post_delete/{post_pk}")
    public String deleteForm(@PathVariable("post_pk") Long id, Model model) {
        PostDto postDto = postService.getPost(id);
        model.addAttribute("post_id", postDto.getId());
        return "community/post_delete";
    }

    @RequestMapping(value = "/post_delete/{post_pk}")
    public String postDelete(@PathVariable String post_pk) {
        postService.delete(Long.valueOf(post_pk));
        return "redirect:/post_list";
    }

    /**
     * 댓글
     */
    @PostMapping("comment_input_password")
    @ResponseBody
    public String comment_input_password(HttpServletRequest request, Model model) {

        String comment_password = request.getParameter("comment_password"); //입력한 비밀번호

        String comment_pk = request.getParameter("comment_pk"); //해당 게시물 id 가져오기

        CommentDto getCommentData = commentService.getComment(Long.valueOf(comment_pk));

        String org_password = getCommentData.getComment_password(); //댓글 등록시 비밀번호

        String passcheck = "";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (encoder.matches(comment_password, org_password)) {
            passcheck = "true";
        }else{
            passcheck = "false";
        }
        model.addAttribute("passcheck", passcheck);

        return passcheck;
    }

    @PostMapping("comment_save")
    public String commentSave(HttpServletRequest request, CommentDto commentDto) {
        String post_id = request.getParameter("post_id");
        String comment_name = request.getParameter("comment_name");
        String comment_password = request.getParameter("comment_password");
        String comment_content = request.getParameter("comment_content");
        comment_password = commentDto.getComment_password(); //입력한 패스워드
        comment_password = encoder.encode(comment_password); //패스워드 암호화
        commentDto.setComment_password(comment_password);
        commentService.saveComment(commentDto); //게시글 저장
        return "community/comment_save";
    }

    @RequestMapping(value = "comment_show")
    public String commentShow(HttpServletRequest request, Model model) {
        String post = request.getParameter("post");
        List<Comment> comment = commentService.findByPost_id(Long.parseLong(post), Sort.by(desc("id")));

        model.addAttribute("comment", comment);
        model.addAttribute("post", post);
        return "community/comment_show";
    }


    /**
     * 댓글 수정
     */
    @PutMapping("comment_update")
    public String commentUpdate(HttpServletRequest request, CommentDto commentDto) {
        String comment_pk = request.getParameter("comment_pk");
        commentService.update(Long.valueOf(comment_pk), commentDto);
        return "community/comment_show";
    }

    /**
     * 댓글 삭제
     */
    @RequestMapping(value = "comment_delete")
    public String commentDelete(HttpServletRequest request) {
        String comment_pk = request.getParameter("comment_pk");
        commentService.delete(Long.valueOf(comment_pk));
        return "community/comment_show";
    }
}
