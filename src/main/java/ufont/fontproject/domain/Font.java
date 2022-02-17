package ufont.fontproject.domain;

import lombok.NoArgsConstructor;
import javax.persistence.*;


@Entity //JPA 사용시 DB Table과 직접적으로 매핑하여 DB에 접근할때 사용
@NoArgsConstructor
public class Font {

    @Id //객체의 Primary Key를 의미
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "font_name")
    private String font_name;

    @Column(name = "font_copyright")
    private String font_copyright;

    @Column(name = "font_url")
    private String font_url;

    public Font(String font_name, String font_copyright, String font_url) {
        this.font_name = font_name;
        this.font_copyright = font_copyright;
        this.font_url = font_url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFont_name() {
        return font_name;
    }

    public void setFont_name(String font_name) {
        this.font_name = font_name;
    }

    public String getFont_copyright() {
        return font_copyright;
    }

    public void setFont_copyright(String font_copyright) {
        this.font_copyright = font_copyright;
    }

    public String getFont_url() {
        return font_url;
    }

    public void setFont_url(String font_url) {
        this.font_url = font_url;
    }

    @Override
    public String toString() {
        return "{" + "id=" + id +
                ", font_name='" + font_name + '\'' +
                ", font_copyright='" + font_copyright + '\'' +
                ", font_url='" + font_url + '\'' +
                '}';
    }

}
