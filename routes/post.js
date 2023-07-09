const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// 게시글 작성
router.post('/', async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // 게시글 생성
    const post = await Post.create({ title, content, UserId: userId });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 댓글 작성
router.post('/:postId/comments', async (req, res) => {
  try {
    const { content, userId } = req.body;
    const postId = req.params.postId;

    // 댓글 생성
    const comment = await Comment.create({ content, UserId: userId, PostId: postId });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 좋아요 기능
router.post('/:postId/like', async (req, res) => {
  try {
    const postId = req.params.postId;

    // 게시글 조회
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    // 좋아요 수 증가
    post.likes += 1;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;