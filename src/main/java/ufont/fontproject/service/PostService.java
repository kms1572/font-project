package ufont.fontproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ufont.fontproject.domain.CaptchaSettings;
import ufont.fontproject.domain.Comment;
import ufont.fontproject.domain.Post;
import ufont.fontproject.domain.PostDto;
import ufont.fontproject.repository.PostRepository;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public abstract class PostService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private CaptchaSettings captchaSettings;

    @Transactional
    public void savePost(PostDto postDto) {//글쓰기 버튼 클릭시 실행됨
        postRepository.save(postDto.toEntity()).getId();
    }

    // 게시글 리스트 처리
    public Page<Post> postList(Pageable pageable) {
        int page = (pageable.getPageNumber() == 0) ? 0 : (pageable.getPageNumber() - 1);
        pageable = PageRequest.of(page, 5, Sort.by(Sort.Direction.DESC, "id"));
        return postRepository.findAll(pageable);
    }

    public List<Post> findAll() {
        return this.postRepository.findAll();
    }

    @Transactional
    public Boolean getListCheck(Pageable pageable) {
        Page<Post> saved = postList(pageable);
        Boolean check = saved.hasNext();
        return check;
    }

    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Transactional
    public List<PostDto> getPostList() { //저장된 모든 데이터 가져올때 사용
        List<Post> postList = postRepository.findAll();
        List<PostDto> postDtoList = new ArrayList<>();

        for(Post post : postList) {
            PostDto postDto = PostDto.builder()
                    .id(post.getId())
                    .post_name(post.getPost_name())
                    .post_password(post.getPost_password())
                    .post_content(post.getPost_content())
                    .updated_at(post.getUpdated_at())
                    .build();
            postDtoList.add(postDto);
        }
        return postDtoList;
    }

    @Transactional
    public PostDto getPost(Long id) {
        Post post = postRepository.findById(id).get();

        PostDto postDto = PostDto.builder()
                .id(post.getId())
                .post_name(post.getPost_name())
                .post_password(post.getPost_password())
                .post_content(post.getPost_content())
                .updated_at(post.getUpdated_at())
                .build();
        return postDto;
    }

    public boolean verifyRecaptcha(String recaptcha) {

        final String SECRET_KEY = this.captchaSettings.getSecret(); // 비밀키 호출
        final String RE_URL = this.captchaSettings.getUrl(); // 인증할 URL

        try {
            URL obj = new URL(RE_URL);
            HttpsURLConnection con = (HttpsURLConnection) obj.openConnection();
            con.setRequestMethod("POST");

            String postParams = "secret=" + SECRET_KEY + "&response=" + recaptcha;
            con.setDoOutput(true);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JsonReader jsonReader = Json.createReader(new StringReader(response.toString()));
            JsonObject jsonObject = jsonReader.readObject();
            jsonReader.close();
            return jsonObject.getBoolean("success"); //최종 Return 값 : true or false

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Long update(final Long id, final PostDto postDto) {
        Post entity = postRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = "+id));
        entity.update(postDto.getPost_content());
        return id;
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void delete(Long id){
        Post post = postRepository.findById(id).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다. id = "+id));
        postRepository.delete(post);
    }

}
