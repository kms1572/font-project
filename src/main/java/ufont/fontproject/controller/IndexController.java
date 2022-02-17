package ufont.fontproject.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.*;
import java.util.*;

import org.json.JSONObject;
import ufont.fontproject.domain.Font;
import ufont.fontproject.service.FontService;


@Controller
public class IndexController {

    @GetMapping("/")
    public String index() {
        return "index";
    }


    private FontService fontService;

    @Autowired
    public void IndexController(FontService fontService) {
        this.fontService = fontService;
    }

    @RequestMapping(value = "font_result", method = RequestMethod.POST)
    public String font_result(@RequestParam("snapshot_data") String snapshot_data, Model model) throws IOException {


        HashMap<String, String> data = new HashMap<String, String>(); //to dictionary
        data.put("snapshot_data", snapshot_data);
        String host_url = "http://127.0.0.1:5000/predict";

        URL url = new URL(host_url);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        try {
            conn.setRequestMethod("POST"); //리퀘스트 메소드를 POST로 설정
            conn.setRequestProperty("Content-Type", "application/json; utf-8"); //post body json으로 던지기 위함
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoInput(true); //inputStream 으로 응답헤더와 메시지를 읽어들이겠다는 옵션
            conn.setDoOutput(true); //연결된 connection 에서 출력도 하도록 설정 //OutputStream을 사용해서 post body 데이터 전송
            conn.setUseCaches(false);

            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(data);

            //요청 데이터 보내기
            DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
            wr.writeBytes(json);
            wr.flush();
            wr.close();

//            int responseCode = conn.getResponseCode(); //확인 용도
//            System.out.println("\nSending 'POST' request to URL : " + url);
//            System.out.println("Response Code : " + responseCode);

            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                String info = response.toString();

                JSONObject jsonObject = new JSONObject(info);
                JSONArray font_result = jsonObject.getJSONArray("RESULT"); //추천 폰트 10개 리스트 플라스크
// 플라스크에서 추천 폰트 리스트를 가져옴--------------------------------------------

                ArrayList<Object> result = new ArrayList<>();
                List<Font> font_result_list = null;

                for (Object i : font_result) { //font_result는 폰트 리스트
                    font_result_list = fontService.findByName((String) i);
//                    Long id = font_result_list.get(0).getId();
                    String font_name = String.valueOf(font_result_list.get(0).getFont_name());
                    String font_copyright = String.valueOf(font_result_list.get(0).getFont_copyright());
                    String font_url = String.valueOf(font_result_list.get(0).getFont_url());

                    result.add(new Font(font_name, font_copyright, font_url));
                }
                model.addAttribute("result", result);
            }
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
        return "font_result"; //템플릿 name과 같음(font_result 템플릿으로 가서 렌더링해라)
    }
}