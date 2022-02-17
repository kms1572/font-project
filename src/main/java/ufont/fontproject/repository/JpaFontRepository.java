package ufont.fontproject.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ufont.fontproject.domain.Font;

import javax.persistence.EntityManager;
import java.util.List;


@Repository
public class JpaFontRepository implements FontRepository{

    private final EntityManager em;

    public JpaFontRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Page<Font> findAll(Pageable pageable) {
        return (Page<Font>) em.createQuery("select f from Font as f", Font.class).getResultList();
    }

    @Override
    public List<Font> findByName(String font_name) { // PK 기반이 아닌 것들은 sql문을 작성해줘야 한다.
        return em.createQuery("select f from Font f where f.font_name = :font_name", Font.class)
                .setParameter("font_name", font_name)
                .getResultList();
    }
}
