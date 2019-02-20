//変換表を対象言語やオプションに応じて動的に作成するためのスクリプト
$(function(){
	rome=charCon.rome;
	converted=charCon.converted;
	$tbody=$("tbody");
	$tbody.append("<tr><th>ローマ字</th><th>キリル文字</th></tr>"); //"キリル文字"のところはクエリで入れ替えられるようにする予定
	for (var i=0;i<rome.length;i++){
		$tbody.append(`<tr><td>${rome[i]}</td><td>${converted[i]}</td></tr>`);
	}
});
