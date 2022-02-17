package ufont.fontproject.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class CommentDto { //순수한 데이터 객체
    private Long id;
    private Post post;
    private String comment_name;
    private String comment_password;
    private String comment_content;
    private LocalDateTime created_at;
    private LocalDateTime  updated_at;

    public Comment toEntity() {
        Comment build = Comment.builder()
                .post(post)
                .comment_name(comment_name)
                .comment_password(comment_password)
                .comment_content(comment_content)
                .build();
        return build;
    }

    @Builder
    public CommentDto(Long id, Post post, String comment_name, String comment_password, String comment_content, LocalDateTime created_at, LocalDateTime updated_at) {
        this.id = id;
        this.post = post;
        this.comment_name = comment_name;
        this.comment_password = comment_password;
        this.comment_content = comment_content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
