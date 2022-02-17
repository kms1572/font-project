package ufont.fontproject.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ufont.fontproject.domain.Font;

import java.util.List;


@Repository
public interface FontRepository {

    Page<Font> findAll(Pageable pageable);
    List<Font> findByName(String font_name);
}
