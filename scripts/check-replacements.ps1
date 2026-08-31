$urls = @(
  # Taj Mahal / Agra
  'photo-1548013146-72479768bada',
  'photo-1587474260584-136574528ed5',
  'photo-1564507592333-c60657eea523',
  # Varanasi / Ghats
  'photo-1561361513-2d000a50f0dc',
  'photo-1602216056096-3b40cc0c9944',
  # Rajasthan / Desert / Forts
  'photo-1477587458883-47145ed94245',
  'photo-1512343879784-a960bf40e7f2',
  'photo-1599661046289-e31897846e41',
  # Kerala / Backwaters
  'photo-1559827260-dc66d52bef19',
  'photo-1602216056096-3b40cc0c9944',
  # Hampi / Karnataka
  'photo-1578662996442-48f60103fc96',
  'photo-1561361513-2d000a50f0dc',
  # Kochi / Kerala
  'photo-1559827260-dc66d52bef19',
  'photo-1602216056096-3b40cc0c9944',
  # Avatar / People
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
  'photo-1472099645785-5658abf4ff4e',
  # India generic / Architecture
  'photo-1524492412937-b28074a5d7da',
  'photo-1587474260584-136574528ed5',
  'photo-1564507592333-c60657eea523',
  # Mountains / Himalayas
  'photo-1506905925346-21bda4d32df4',
  'photo-1519681393784-d120267933ba',
  'photo-1464822759023-fed622ff2c3b',
  # Beaches
  'photo-1507525428034-b723cf961d3e',
  'photo-1519046904884-53103b34b206',
  # Food
  'photo-1546069901-ba9599a7e63c',
  'photo-1568488235118-5a4180b688cc',
  'photo-1626082927389-6cd097cdc029',
  # Wildlife
  'photo-1516426122078-c23e76319801',
  'photo-1564349388535-e0da2737ca1c',
  'photo-1485208544902-fad2c80b3dd1',
  # Temple / Spiritual
  'photo-1526336024174-e58f5cdd8e13',
  'photo-1572410779033-e1a0624752f6',
  # City / Urban
  'photo-1569163139394-de4798aa62b6',
  'photo-1512453475621-48a65bde63d5',
  # Train
  'photo-1559521713-38d7eda40e2b',
  'photo-1576956502862-58f9e88222ae',
  # Festival
  'photo-1533900298318-6b8da08a523e',
  'photo-1600098746282-e2bfb7c68e43'
)

foreach ($u in $urls) {
  $url = "https://images.unsplash.com/$u" + "?w=50" + "&q=5"
  try {
    $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 5
    Write-Host "$u : $($r.StatusCode)"
  } catch {
    Write-Host "$u : FAILED"
  }
}