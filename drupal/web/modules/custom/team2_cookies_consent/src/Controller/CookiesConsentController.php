<?php

namespace Drupal\team2_cookies_consent\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Helps to insert and display cookies consent data.
 */
class CookiesConsentController extends ControllerBase
{

    /**
     * Insert cookies consent data.
     */
    public function insert()
    {
        $request = \Drupal::request();
        $content = $request->getContent();
        $body = json_decode($content, true);
        \Drupal::logger('cookies_consent')->notice('Cookies consent data: ' . print_r($body, true));

        if (empty($body)) {
            return new JsonResponse(['error' => 'Invalid request data'], 400);
        }

        try {
            $database = \Drupal::database();

            $currentDate = new \DateTime();
            $expirationDate = new \DateTime();
            $expirationDate->add(new \DateInterval('P6M'));

            $query = $database->insert('cookies_consent')
                ->fields(
                    [
                    'isNecessaryCookiesAvailable' => 1,
                    'isFunctionalCookiesAvailable' => $body['isFunctionalCookiesAvailable'] == true ? 1 : 0,
                    'isAnalyticsCookiesAvailable' => $body['isAnalyticsCookiesAvailable'] == true ? 1 : 0,
                    'isPerformanceCookiesAvailable' => $body['isPerformanceCookiesAvailable'] == true ? 1 : 0,
                    'isAdvertisingCookiesAvailable' => $body['isAdvertisingCookiesAvailable'] == true ? 1 : 0,
                    'consentDate' => $currentDate->format('Y-m-d H:i:s'),
                    'expirationDate' => $expirationDate->format('Y-m-d H:i:s'),
                    ]
                )
                ->execute();

            if ($query) {
                  $insertedId = $database->lastInsertId();
                  return new JsonResponse(['message' => 'Data inserted successfully', 'id' => $insertedId], 200);
            } else {
                return new JsonResponse(['error' => 'Error occurred while inserting data'], 500);
            }
        }
        catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error occurred while inserting data'], 500);
        }
    }

    /**
     * Display cookies consent data.
     */
    public function display()
    {
        $query = \Drupal::database()->select('cookies_consent', 'c');
        $query->fields('c');

        $pageNumber = \Drupal::request()->query->get('page') ?: 1;
        $limit = 3; 
        $offset = ($pageNumber - 1) * $limit;
        $query->range($offset, $limit);

        $consents = $query->execute()->fetchAll();
        
        $totalRecords = $this->getTotalRecordsCount();
        $totalPages = ceil($totalRecords / $limit);

        if ($pageNumber > 1) {
            $previousPage = $pageNumber - 1;
            $url = Url::fromRoute('cookies_consent.consent_list', ['page' => $previousPage]);
            $buttonPreviousPage = [
            '#type' => 'link',
            '#title' => 'Previous Page',
            '#url' => $url,
            '#attributes' => ['class' => ['button', 'button--small'], 'style' => 'float: left;']
            ];
        }
    
        if ($pageNumber < $totalPages) {
            $nextPage = $pageNumber + 1;
            $url = Url::fromRoute('cookies_consent.consent_list', ['page' => $nextPage]);
            $buttonNextPage = [
            '#type' => 'link',
            '#title' => 'Next Page',
            '#url' => $url,
            '#attributes' => ['class' => ['button', 'button--small'], 'style' => 'float: left;']
            ];
        }
   
        $build['content'] = [
        '#type' => 'table',
        '#header' => [
        'ID',
        'Necessary',
        'Functional',
        'Analytics',
        'Performance',
        'Advertising',
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
            $value->isNecessaryCookiesAvailable === '1' ? 'Yes' : 'No',
            $value->isFunctionalCookiesAvailable === '1' ? 'Yes' : 'No',
            $value->isAnalyticsCookiesAvailable === '1' ? 'Yes' : 'No',
            $value->isPerformanceCookiesAvailable === '1' ? 'Yes' : 'No',
            $value->isAdvertisingCookiesAvailable === '1' ? 'Yes' : 'No',
            $formattedConsentDate,
            $formattedExpirationDate,
            ];

            $build['pager'] = [
            '#type' => 'pager',
            ];

            if (isset($buttonPreviousPage)) {
                $build['previous_page'] = $buttonPreviousPage;
            }
            if (isset($buttonNextPage)) {
                $build['next_page'] = $buttonNextPage;
            }
        }
        return $build;
    }

    /**
     * Get total records count.
     */
    function getTotalRecordsCount()
    {
        $connection = \Drupal::database();
        $query = $connection->select('cookies_consent');
        $query->addExpression('COUNT(*)');
        $result = $query->execute()->fetchField();

        return $result;
    }
}
