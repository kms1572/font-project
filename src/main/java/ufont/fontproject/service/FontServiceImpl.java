package ufont.fontproject.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ufont.fontproject.domain.Font;

import javax.persistence.EntityManager;
import java.util.List;


@Service
public class FontServiceImpl implements FontService{

    EntityManager em;

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
}
