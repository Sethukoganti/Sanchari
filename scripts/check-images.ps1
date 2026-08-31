$urls = @(
  'photo-1602216056096-3b40cc0c9944',
  'photo-1506905925346-21bda4d32df4',
  'photo-1561361513-2d000a50f0dc',
  'photo-1512343879784-a960bf40e7f2',
  'photo-1524492412937-b28074a5d7da',
  'photo-1587474260584-136574528ed5',
  'photo-1564507592333-c60657eea523',
  'photo-1559827260-dc66d52bef19',
  'photo-1566150905458-1bf049841919',
  'photo-1599491514677-42ac95c7bfd6',
  'photo-1507525428034-b723cf961d3e',
  'photo-1626621341517-bbf3d9990a23',
  'photo-1564760055775-d63b17a69c41',
  'photo-1578662996442-48f60103fc96',
  'photo-1464822759023-fed622ff2c3b',
  'photo-1596176538479-824d4db43249',
  'photo-1621406892195-4f34ef688296',
  'photo-1582510003544-4d00b7f74220',
  'photo-1500530855697-b586d89ba3ee',
  'photo-1521295121783-8a321d551ad2',
  'photo-1555939594-58d7cb561ad1',
  'photo-1532375810709-75b1da00537c',
  'photo-1470770841072-f978cf4d019e',
  'photo-1519681393784-d120267933ba',
  'photo-1501785888041-af3ef285b470',
  'photo-1473580044384-7ba9967e16a0',
  'photo-1570168007204-dfb528c6958f',
  'photo-1583417319070-4a69db38a482',
  'photo-1528127269322-539801943592',
  'photo-1585937421612-70a008356fbe',
  'photo-1586796676789-f9cb4dd7e4f6',
  'photo-1494790108377-be9c29b29330',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
  'photo-1472099645785-5658abf4ff4e'
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