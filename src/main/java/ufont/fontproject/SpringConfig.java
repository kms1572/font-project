package ufont.fontproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ufont.fontproject.domain.*;
import ufont.fontproject.repository.CommentRepository;
import ufont.fontproject.repository.FontRepository;
import ufont.fontproject.repository.JpaFontRepository;
import ufont.fontproject.service.CommentService;
import ufont.fontproject.service.FontService;
import ufont.fontproject.service.PostService;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;


@Configuration
    public class SpringConfig {

        EntityManager em;

        @Autowired
        public SpringConfig(EntityManager em) {
                this.em = em;
        }

        @Bean
        public FontService fontService() {
            return new FontService() {
                @Override
                public List<Font> findAll(Pageable pageable) {
                    return em.createQuery("select f from Font as f", Font.class).getResultList();
                }

                @Override
                public List<Font> findByName(String font_name) {
                    return em.createQuery("select f from Font f where f.font_name = :font_name", Font.class)
                            .setParameter("font_name", font_name)
                            .getResultList();
                }
            };
        }

        @Bean
        public FontRepository fontRepository() {
            return new JpaFontRepository(em);
        }

        @Bean
        public PostService postService() {
            return new PostService() {
                @Override
                public void savePost(PostDto postDto) {
                    super.savePost(postDto);
                }

                @Override
                public Page<Post> postList(Pageable pageable) {
                    return super.postList(pageable);
                }

                @Override
                public List<Post> findAll() {
                    return super.findAll();
                }

                @Override
                public Optional<Post> findById(Long id){
                    return super.findById(id);
                }

            };
        }

        @Bean
        public CommentService commentService(CommentRepository commentRepository) {
            return new CommentService(commentRepository) {
                @Override
                public void saveComment(CommentDto commentDto) {
                    super.saveComment(commentDto);
                }

            };
        }
}