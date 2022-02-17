package ufont.fontproject.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ufont.fontproject.domain.Font;

import java.util.List;


@Service
public interface FontService {

    List<Font> findAll(Pageable pageable);
    List<Font> findByName(String font_name);

}
