package ufont.fontproject.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ufont.fontproject.domain.Font;
import ufont.fontproject.service.FontService;

import java.util.List;


@Controller
public class AdminController {

    private final FontService fontService;

    public AdminController(FontService fontService) {
        this.fontService = fontService;
    }

    @GetMapping("admin")
    public String viewAdmin() {
        return "admin/main";
    }

    @GetMapping("admin/font")
    public String viewAdminFont(Model model, @PageableDefault(page = 0, size = 15) Pageable pageable) {

        List<Font> list = fontService.findAll(pageable);

        model.addAttribute("fontList", list);

        return "admin/admin_font";
    }

    @GetMapping("admin/post")
    public String viewAdminPost(Model model) {
        return "admin/admin_post";
    }

    @GetMapping("admin/comment")
    public String viewAdminComment(Model model) {
        return "admin/admin_comment";
    }
}
