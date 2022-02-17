package ufont.fontproject.domain;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostDto {//Controller와 Service 사이에서 데이터를 주고받는
    private Long id;
    private String post_name;
    private String post_password;
    private String post_content;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private Set<Comment> comments;

    public Post toEntity() {
        Post build = Post.builder()
                .comments(comments)
                .post_name(post_name)
                .post_password(post_password)
                .post_content(post_content)
                .build();
        return build;
    }

    @Builder
    public PostDto(Long id, String post_name, String post_password, String post_content, LocalDateTime created_at, LocalDateTime updated_at, Set<Comment> comments) {
        this.comments = comments;
        this.id = id;
        this.post_name = post_name;
        this.post_password = post_password;
        this.post_content = post_content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
