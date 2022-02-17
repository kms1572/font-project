package ufont.fontproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ufont.fontproject.domain.Comment;
import ufont.fontproject.domain.CommentDto;
import ufont.fontproject.repository.CommentRepository;
import java.util.List;

import static org.springframework.data.domain.Sort.Order.desc;


@Service
@Transactional(readOnly = true)
public abstract class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {

        this.commentRepository = commentRepository;
    }

    public List<Comment> findAll() {
        return this.commentRepository.findAll();
    }

    @Transactional
    public void saveComment(CommentDto commentDto) {//확인 버튼 클릭시 실행됨
        commentRepository.save(commentDto.toEntity());
    }

    public List<Comment> findByPost_id(@Param(value = "postID") long postId, Sort id) { //comment_show
        return this.commentRepository.findByPost_id(postId, Sort.by(desc("id")));
    }

    public CommentDto getComment(Long id) {
        Comment comment = commentRepository.findById(id).get();
        CommentDto commentDto = CommentDto.builder()
                .id(comment.getId())
                .comment_name(comment.getComment_name())
                .comment_password(comment.getComment_password())
                .comment_content(comment.getComment_content())
                .created_at(comment.getCreated_at())
                .updated_at(comment.getUpdated_at())
                .build();
        return commentDto;
    }

    /**
     * 댓글 수정
     */
    @Transactional
    public Long update(final Long comment_pk, final CommentDto commentDto) {
        Comment entity = commentRepository.findById(comment_pk).orElseThrow(() -> new IllegalArgumentException("해당 댓글이 없습니다."));
        entity.update(commentDto.getComment_content());
        return comment_pk;
    }

    /**
     * 댓글 삭제
     */
    @Transactional
    public void delete(Long comment_pk){
        Comment comment = commentRepository.findById(comment_pk).orElseThrow(()->new IllegalArgumentException("해당 게시글이 없습니다."));
        commentRepository.delete(comment);
    }
}
