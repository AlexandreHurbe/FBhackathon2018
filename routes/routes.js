const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.get('/', controller.login);

router.get('/forget_pwd', controller.forget_pwd);

router.get('/signup', controller.signup);

router.get('/board_page', controller.board_page);

router.get('/newroom', controller.create_room);

router.get('/bye', controller.sayGoodbye);

router.post('/submit_user', controller.submit_user);

router.post('/submit_workspace', controller.submit_workspace);

router.post('/add_user', controller.add_user);

router.post('/log_in', controller.log_in);

router.post('/submit_post_it', controller.submit_post_it);

router.post('/submit_event', controller.submit_event);

router.get('/get_workspace_id/:workspaceID', controller.get_workspace_id);

router.get('/logout', controller.logout);

router.get('/my_account', controller.account_page);

router.get('/admin_page', controller.admin_page)

router.get('/get_post_its', controller.get_post_its);

router.get('/get_events', controller.get_events);

router.get('/welcome', controller.welcome);

router.get('/get_workspaces/:workspaceID', controller.get_workspace_name);

module.exports = router;