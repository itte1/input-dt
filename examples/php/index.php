<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/input-dt.css">
</head>
<body>
  <div>
    Value: <?=htmlspecialchars($_POST['calender'] ?? '', ENT_QUOTES, 'UTF-8')?>
  </div>
  <div>
    <form method="post" action=".">
      <input-dt value="<?=htmlspecialchars($_POST['calender'] ?? '', ENT_QUOTES, 'UTF-8')?>">
        <input type="text" input-dt>
        <input type="hidden" name="calender" input-dt-value="YYYY-MM-DD HH:mm:ss">
      </input-dt>
      <button type="submit">送信</button>
    </form>
  </div>
  <script type="module" src="/input-dt.js"></script>
</body>
</html>
