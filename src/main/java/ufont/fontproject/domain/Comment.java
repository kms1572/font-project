package ufont.fontproject.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "comment")
public class Comment extends BaseTimeEntity {

    @Id //객체의 Primary Key를 의미
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_ID")
    private Post post;

    @Column(name = "comment_name")
    private String comment_name;

    @Column(name = "comment_password")
    private String comment_password;

    @Column(columnDefinition = "TEXT", name = "comment_content")
    private String comment_content;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime  updated_at;

    @Builder
    public Comment(Post post, String comment_name, String comment_password, String comment_content) {
        this.post = post;
        this.comment_name = comment_name;
        this.comment_password = comment_password;
        this.comment_content = comment_content;
    }

    public void update(String comment_content) {
        this.comment_content = comment_content;
        this.updated_at = LocalDateTime.now();
    }
}
