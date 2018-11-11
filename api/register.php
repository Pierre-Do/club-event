<?php
require_once './lib/recaptcha-1.2.1/src/autoload.php';
include_once './database.php';
include_once './email.php';

$prices = [];
$prices['dinner'] = 45;
$prices['sleeping'] = 15;
$prices['breakfast'] = 10;
$prices['camping'] = 10;
$prices['picknick'] = 10;

// We need the Db asap.
$db = connectDb();

// Data from the post.
$DATA = json_decode(file_get_contents('php://input'), true);
$email = $DATA['email'];
$language = $DATA['language'];

// This will break of the captcha isn't valid.
validateCaptcha($DATA['recaptcha']);

// Compute the total based on the prices
$total = getTotal($data, $prices);

// Generate a reference number.
$reference = uniqid();

// Save the data
saveData($db, $DATA, $reference, $total);

// At this stage we don't need the Db anymore
disconnectDB();

// Confirm the registration to the user, only if there's a total
if ($total !== '0') {
  //sendEmail($email, $total, $reference, $language);
}

// Success!
echo '{"result": "success", "reference": "' .
  $reference .
  '", "total": "' .
  $total .
  '", "email": "' .
  $email .
  '"}';

function validateCaptcha($recaptchaResponse)
{
  $config = parse_ini_file('./credentials.properties');

  // Recaptcha utils
  $recaptcha = new \ReCaptcha\ReCaptcha($config['recaptcha.key']);

  // Validate the recaptcha
  $resp = $recaptcha->verify($recaptchaResponse);
  if (!$resp->isSuccess()) {
    $errors = $resp->getErrorCodes();
    http_response_code(500);
    echo '{"result": "error", "reason": "' .
      json_encode(print_r($errors)) .
      '"}';
    die();
  }
}

function getTotal($data, $prices)
{
  $dinner = getTotalForItem($data, $prices, 'dinner');
  $sleeping = getTotalForItem($data, $prices, 'sleeping');
  $camping = getTotalForItem($data, $prices, 'camping');
  $picknick = getTotalForItem($data, $prices, 'picknick');
  $breakfast = getTotalForItem($data, $prices, 'breakfast');

  return $dinner + $sleeping + $camping + $picknick + $breakfast;
}

function getTotalForItem($data, $prices, $itemName) {
  return intval($data[$itemName]) * $prices[$itemName];
}

function saveData($db, $data, $reference, $total)
{
  $firstName = $db->real_escape_string($data['firstName']);
  $lastName = $db->real_escape_string($data['lastName']);
  $club = $db->real_escape_string($data['club']);
  $email = $db->real_escape_string($data['email']);
  $comment = $db->real_escape_string($data['comment']);
  $meeting = $db->real_escape_string($data['meeting']);
  $dinner = $db->real_escape_string($data['dinner']);
  $sleeping = $db->real_escape_string($data['sleeping']);
  $camping = $db->real_escape_string($data['camping']);
  $picknick = $db->real_escape_string($data['picknick']);
  $breakfast = $db->real_escape_string($data['breakfast']);

  $sql = "INSERT INTO inscriptions (
    reference,
    total,
    firstName,
    lastName,
    club,
    email,
    comment,
    meeting,
    dinner,
    sleeping,
    camping,
    picknick,
    breakfast
  ) VALUES(
    \"$reference\",
    \"$total\",
    \"$firstName\",
    \"$lastName\",
    \"$club\",
    \"$email\",
    \"$comment\",
    \"$meeting\",
    \"$dinner\",
    \"$sleeping\",
    \"$camping\",
    \"$picknick\",
    \"$breakfast\"
  )";
  sendRequestDB($sql);
}

?>
