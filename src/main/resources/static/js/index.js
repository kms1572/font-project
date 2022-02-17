// 이미지 미리보기 스크립트
function previewImage(targetObj, View_area) {
    var preview = document.getElementById(View_area); //div id
    var ua = window.navigator.userAgent;

    if (ua.indexOf("MSIE") > -1) {
        //ie일때(IE8 이하에서만 작동)
        targetObj.select();
    try {
        var src = document.selection.createRange().text; // get file full path(IE9, IE10에서 사용 불가)
        var ie_preview_error = document.getElementById("ie_preview_error_" + View_area);

        if (ie_preview_error) {
            preview.removeChild(ie_preview_error); //error가 있으면 delete
        }

        var img = document.getElementById(View_area); //이미지가 뿌려질 곳

        //이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
        img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
    } catch (e) {
        if (!document.getElementById("ie_preview_error_" + View_area)) {
            var info = document.createElement("<p>");
            info.id = "ie_preview_error_" + View_area;
            info.innerHTML = e.name;
            preview.insertBefore(info, null);
        }
    }
    } else {
        //ie가 아닐때(크롬, 사파리, FF)
        var files = targetObj.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
            if (!file.type.match(imageType)) continue;
            var prevImg = document.getElementById("prev_" + View_area); //이전에 미리보기가 있다면 삭제
            if (prevImg) {
                preview.removeChild(prevImg);
            }

            var img = document.createElement("img");
            img.id = "prev_" + View_area;
            img.classList.add("obj");
            img.file = file;
            img.style.width = "600px";
            img.style.height = "450px";
            preview.appendChild(img);

            if (window.FileReader) {
                // FireFox, Chrome, Opera 확인.
                var reader = new FileReader();
                reader.onloadend = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
//                    console.log(aImg.src)
                    let prev_View_area = document.getElementById("prev_View_area");
                    prev_View_area.src = aImg.src;
                    snapshot_data = prev_View_area.src;
                    make_darkroom();
                };
            })(img);
            reader.readAsDataURL(file);
            } else {
                // safari is not supported FileReader
                //alert('not supported FileReader');
                if (!document.getElementById("sfr_preview_error_" + View_area)) {
                    var info = document.createElement("p");
                    info.id = "sfr_preview_error_" + View_area;
                    info.innerHTML = "not supported FileReader";
                    preview.insertBefore(info, null);
                }
            }
        }
    }
}

// 검색 버튼 클릭 시 특정 위치로 부드럽게 스크롤 이동
window.onload = function () {
    const button1 = document.getElementById("inputGroupFileAddon04");
    const result = document.getElementById("result");
    const find_text_img = document.getElementById("find_text_img");
    button1.addEventListener("click", () => {
        window.scrollBy({ top: result.getBoundingClientRect().top, behavior: "smooth" });
        find_text_img.src = snapshot_data; // 검색 이미지 출력
    });
};


// 맨위로 가는 버튼 js
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
        $("#topBtn").fadeIn();
        } else {
        $("#topBtn").fadeOut();
        }
    });
    $('#topBtn').click(function(){ //부드럽게 올라감
        $('html, body').animate({scrollTop:0}, 200);
        return false;
    });
});
