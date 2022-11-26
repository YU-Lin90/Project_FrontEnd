z-index 列表

NAVBAR 10
下拉式選單 10
灰色背景 50
燈箱內容 100
<br>

<hr>

問題 1.特定 BOX 滾動到特定位置

2.WEBSOCKET 不要重複開啟

https://stackoverflow.com/questions/1006654/fastest-way-to-find-distance-between-two-lat-long-points
台北市信義區信義路五段 150 巷
25.0259029,121.5703875
500m (0.5 km)
SELECT
id, (
6371 _ acos (
cos ( radians(25.0259029) )
_ cos( radians( lat ) )
_ cos( radians( lng ) - radians(121.5703875) ) + sin ( radians(25.0259029) )
_ sin( radians( lat ) )
)
) AS distance
FROM realestate_a_no
HAVING distance < 0.5
ORDER BY distance

sweetalert2
