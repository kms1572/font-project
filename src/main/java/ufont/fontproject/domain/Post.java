package ufont.fontproject.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;


@Data
@NoArgsConstructor
@Entity
public class Post extends BaseTimeEntity {//데이터베이스 테이블과 매핑되는 객체

    @Id //객체의 Primary Key를 의미
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "post_name")
    private String post_name;

    @Column(name = "post_password")
    private String post_password;

    @Column(columnDefinition = "TEXT", name = "post_content")
    private String post_content;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime created_at;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime  updated_at;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Comment> comments;

    @Builder
    public Post(String post_name, String post_password, String post_content, LocalDateTime created_at, Set<Comment> comments) {
        this.post_name = post_name;
        this.post_password = post_password;
        this.post_content = post_content;
        this.created_at = created_at;
        this.comments = comments;
    }

    public void update(String post_content) {
        this.post_content = post_content;
        this.updated_at = LocalDateTime.now();
    }

}
