\c nc_games_test;
SELECT * FROM reviews;
SELECT * FROM comments;
-- This is for counting comments associated with a review
SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
LEFT JOIN comments ON reviews.review_id = comments.review_id
GROUP BY reviews.review_id;