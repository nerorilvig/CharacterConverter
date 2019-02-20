<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
  <meta name="description" content="ローマ字を各言語の文字に変換するwebアプリ">
  <meta name="keyword" content="ローマ字,文字変換,converter">
  <title>文字変換CharacterConverter</title>
  <link rel="stylesheet" type="text/css" href="../public/stylesheets/default.css">
  <link rel="stylesheet" type="text/css" href="../public/stylesheets/style.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/highlighter.css">
  <link rel="stylesheet" type="text/css" href="stylesheets/table.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="./scripts/converterClass.js"></script>
  <script src="<?php echo "./scripts/Languages/Cyrillic.js" //クエリの値で変更できるようにする予定?>"></script>
  <script src="./scripts/symbols.js"></script>
</head>

<body>
<!-- ヘッダここから -->
<header>
  <h1>ローマ字から各国語の文字に変換するアプリ</h1>
  <div id="box_t">
  <h2 id="top" href="../index.html">CharacterConverter</h2>
</header>
<!-- /ヘッダここまで -->


<div class="container">
  <p>ページ下部の変換表に従って、入力されたローマ字を<?php echo "キリル文字" //値はクエリで受け取るように変更予定?>に自動変換します</p> 
  <div id="textbox">
    <textarea id="input" class="highlighter" placeholder="convert Rome to Cyrillic! ローマ字をキリル文字に変換します！"></textarea>
    <div id="behindInput" class="highlighter"></div>
  </div>
  <p>自動で変換されない場合はスペースキーで手動変換します。スペースを入力したい時は2回連続でスペースキーを押してください</p>
  <h1>ローマ字→<?php echo "キリル文字変換表"?></h2>
  <table>
    <tbody>
    <!-- ./scripts/convertTable.jsで動的に生成-->
    </tbody>
  </table>
</div>

<!-- 広告ここから -->
<!-- /広告ここまで -->


<!-- フッタここから -->
<footer>
  <div id="footer" class="container">
    <!--<p>Copyright&copy; <a href="本人のサイトURL">サイト名</a>, All rights reserved.<br>-->
    <!-- ***削除禁止*** -->
    Designed by <a href="http://www.bannerbridge.net/">バナーブリッジ</a>
    <!-- ***削除禁止*** -->
    </p>
  </div>
</footer>
<!-- /フッタここまで -->
<script src="./scripts/textboxController.js"></script>
<script src="./scripts/highlighter.js"></script>
<script src="./scripts/convertTable.js"></script>
</body>
</html>
