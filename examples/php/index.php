<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/input-dt@0.1.0/input-dt-min.css">
</head>
<body>
  <div>
    Value: <?=$_POST['calender']?>
  </div>
  <div>
    <form method="post" action=".">
      <input-dt value="<?=$_POST['calender']?>">
        <input type="text" input-dt>
        <input type="hidden" name="calender" input-dt-value="YYYY-MM-DD HH:mm:ss">
      </input-dt>
      <button type="submit">送信</button>
    </form>
  </div>
  <script type="module" src="https://cdn.jsdelivr.net/npm/input-dt@0.1.0/input-dt-min.js"></script>
</body>
</html>