// 썸머노트 설정
$(document).ready(function() {
    $('#summernote').summernote({
        width: '63%',
        height: 300,                 // 에디터 높이
        minHeight: null,             // 최소 높이
        maxHeight: null,             // 최대 높이
        focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
        lang: "ko-KR",					// 한글 설정
        spellCheck: false,
        disableResizeEditor: true,	// 크기 조절 기능 삭제
        placeholder: '이미지와 내용을 입력해주세요.',	//placeholder 설정
        toolbar: [
            // [groupName, [list of button]]
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
            ['color', ['forecolor']],
            ['table', ['table']],
            ['para', ['paragraph']],
            ['height', ['height']],
            ['insert',['picture']],
            ['view', ['help']],
        ],
        fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋음체','바탕체'],
        fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
        callbacks: {	//이미지 첨부하는 부분
            onImageUpload : function(files) {
                uploadSummernoteImageFile(files[0],this);
            }
        }
    });

    $('p').css('margin-bottom','0') // enter 줄 높이
    $('.note-resizebar').css('display','none');

    $("div.note-editable").on('drop',function(e){
        for(let i=0; i< e.originalEvent.dataTransfer.files.length; i++){
            uploadSummernoteImageFile(e.originalEvent.dataTransfer.files[i],$("#summernote")[0]);
        }
        e.preventDefault();
    })
});

function uploadSummernoteImageFile(file, editor) {
    let data = new FormData();
    data.append("file", file);
    $.ajax({
        data : data,
        type : "POST",
        url : "/uploadSummernoteImageFile",
        contentType : false,
        processData : false,
        success : function(data) {
            //항상 업로드된 파일의 url이 있어야 한다.
            $(editor).summernote('insertImage', data.url);
        }
    });
}

// 글작성 중 페이지 이동시 경고창
function page_back() {
    var checkload = true;
    $("#subminBtn").click(function () {
        checkload = false;
    });
    $(window).on("beforeunload", function () {
        if (checkload == true) return "정말로 나가시겠습니까?";
    });
}