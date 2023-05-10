\c nc_news_test




  SELECT 
       ,title,article_id,topic,created_at,votes,article_img_url,
         COUNT(comments.comment_id) as comment_count
        FROM articles 
        JOIN comments
        ON comments.article_id=articles.article_id
        GROUP BY articles.article_id;