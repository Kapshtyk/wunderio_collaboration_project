<?php

namespace Drupal\cookies_consent\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Helps to insert and display cookies consent data.
 */
class CookiesConsentController extends ControllerBase {

  /**
   *
   */
  public function insert() {
    $request = \Drupal::request();
    $content = $request->getContent();
    $body = json_decode($content, TRUE);

    if (empty($body)) {
      return new JsonResponse(['error' => 'Invalid request data'], 400);
    }

    try {
      $database = \Drupal::database();

      $currentDate = new \DateTime();
      $expirationDate = new \DateTime();
      $expirationDate->add(new \DateInterval('P1Y'));

      $database->insert('cookies_consent')
        ->fields([
          'isFunctionalCookiesAvailable' => $body['isFunctionalCookiesAvailable'],
          'isAnalyticsCookiesAvailable' => $body['isAnalyticsCookiesAvailable'],
          'isPerformanceCookiesAvailable' => $body['isPerformanceCookiesAvailable'],
          'isAdvertisingCookiesAvailable' => $body['isAdvertisingCookiesAvailable'],
          'consentDate' => $currentDate->format('Y-m-d H:i:s'),
          'expirationDate' => $expirationDate->format('Y-m-d H:i:s'),
        ])
        ->execute();

      return new JsonResponse(['message' => 'Data inserted successfully'], 200);
    }
    catch (\Exception $e) {
      return new JsonResponse(['error' => 'Error occurred while inserting data'], 500);
    }
  }

  /**
   *
   */
  public function display() {
    $consents = \Drupal::database()->select('cookies_consent', 'c')
      ->fields('c')
      ->execute()
      ->fetchAll();

    $build['content'] = [
      '#type' => 'table',
      '#header' => [
        'ID',
        'Functional Cookies',
        'Analytics Cookies',
        'Performance Cookies',
        'Advertising Cookies',
        'Consent Date',
        'Expiration Date',
      ],
    ];

    foreach ($consents as $consent => $value) {
      $consentDate = \DateTime::createFromFormat('Y-m-d H:i:s', $value->consentDate);
      $expirationDate = \DateTime::createFromFormat('Y-m-d H:i:s', $value->expirationDate);

      $formattedConsentDate = $consentDate->format('d-m-Y');
      $formattedExpirationDate = $expirationDate->format('d-m-Y');

      $build['content']['#rows'][] = [
        $value->id,
        $value->isFunctionalCookiesAvailable === 1 ? 'Yes' : 'No',
        $value->isAnalyticsCookiesAvailable === 1 ? 'Yes' : 'No',
        $value->isPerformanceCookiesAvailable === 1 ? 'Yes' : 'No',
        $value->isAdvertisingCookiesAvailable === 1 ? 'Yes' : 'No',
        $formattedConsentDate,
        $formattedExpirationDate,
      ];
    }
    return $build;
  }

}
