package ufont.fontproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufont.fontproject.domain.Post;


@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
