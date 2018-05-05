const mongoose = require('mongoose');
const users_db = mongoose.model('users');
const workspace_db = mongoose.model('workspaces');
const workspace_users_db = mongoose.model('workspace_users');
const sessions_db = mongoose.model('sessions');
const post_its_db = mongoose.model('post_its');
const events_db = mongoose.model('events');

module.exports.login = function(req, res){
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                res.redirect('/board_page');
            } else {
                res.render('./pages/login', { forget_pwd_link: "/forget_pwd",
                    signup_link: "/signup", newroom_link: "/newroom"});
            }
        });
    } else {
        res.render('./pages/login', { forget_pwd_link: "/forget_pwd",
            signup_link: "/signup", newroom_link: "/newroom"});
    }
};

module.exports.admin_page = function(req, res) {
    var is_admin = "false";
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                workspace_users_db.find({"userID":sessions_found[0].userID}, function(err, workspaceID_found) {
                    if(workspaceID_found[0].user_role == "admin"){
                        is_admin = "true";
                    }
                    workspace_db.find({"_id":workspaceID_found[0].workspaceID}, function(err, workspace_found) {
                        res.render('./pages/admin_page', { my_account: "/my_account",
                            log_out_link: "/",
                            workspace_name: workspace_found[0].workspace_name.toUpperCase(),
                            isAdmin:is_admin});
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
};


module.exports.account_page = function(req, res) {
    var is_admin = "true";
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                workspace_users_db.find({"userID":sessions_found[0].userID}, function(err, workspaceID_found) {
                    if(workspaceID_found[0].user_role == "admin"){
                        is_admin = "true";
                    }
                    workspace_db.find({"_id":workspaceID_found[0].workspaceID}, function(err, workspace_found) {
                        res.render('./pages/accountpage', { my_account: "/my_account",
                                                            log_out_link: "/",
                                                            workspace_name: workspace_found[0].workspace_name.toUpperCase(),
                                                            isAdmin:is_admin});
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
    //res.render('./pages/accountpage', {my_account: "/my_account"});
};



module.exports.submit_user = function(req, res) {
    for (key in req.body) {
        if (req.body[key] == "") {
            res.send("0Error: Please fill in all fields");
            return;
        }
    }

    users_db.find({"email":req.body.email}, function(err, user)  {
        if (user.length == 0) {
            var user = new users_db({
                "firstname":req.body.firstname,
                "lastname":req.body.lastname,
                "email":req.body.email,
                "password":req.body.password
            });

            user.save(function (err, new_user) {
                if (!err) {
                    res.send("1" + new_user._id);
                } else {
                    res.send("0Error: Database error");
                }
            });
        } else {
            res.send("0Error: Email already exists");
        }
    });

};

module.exports.get_post_its = function(req, res) {
    sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
        if (sessions_found.length) {
            post_its_db.find({"workspaceID":req.cookies.workspaceID}, function(err, post_its_found) {
                res.send(post_its_found);
            });
        }
    });
};

module.exports.submit_post_it = function(req, res) {
    for (key in req.body) {
        if (req.body[key] == "") {
            res.send("0Error: Please fill in all fields");
            return;
        }
    }

    sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
        if (sessions_found.length) {
                var post_it = post_its_db({
                    "workspaceID":req.cookies.workspaceID,
                    "userID":sessions_found[0].userID,
                    "postItContent":req.body.post_it_content,
                    "anonymous":req.body.anonymous,
                    "hide": req.body.hide
                });

                post_it.save(function (err, new_post_it) {
                    if (!err) {
                        res.send("1" + new_post_it._id);
                    } else {
                        res.send("0Error: Database error");
                    }
                });

        } else {
            res.send("0Error: Database error");
        }
    });
};

module.exports.get_events = function(req, res) {
    sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
        if (sessions_found.length) {
            events_db.find({"workspaceID":req.cookies.workspaceID}, function(err, events_found) {
                res.send(events_found);
            });
        }
    });
};

module.exports.submit_event = function(req, res) {

    sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {

        if (sessions_found.length) {
            var event =  events_db({
                "workspaceID":req.cookies.workspaceID,
                "userID":sessions_found[0].userID,
                "eventName": req.body.eventName,
                "location": req.body.location,
                "date": req.body.date,
                "startTime": req.body.startTime,
                "endTime": req.body.endTime
            });

            event.save(function (err, new_event) {
                if (!err) {
                    res.send("1" + new_event._id);
                } else {
                    res.send("0Error: Database error");
                }
            });

        } else {
            res.send("0Error: Database error");
        }
    });
};

module.exports.submit_workspace = function(req, res) {
    for (key in req.body) {
        if (req.body[key] == "") {
            res.send("0Error: Please fill in all fields");
            return;
        }
    }

    if (req.body.workspaceID.indexOf(" ") != -1) {
        res.send("0Error: Workspace ID contains spaces");
        return;
    }

    workspace_db.find({"workspaceID":req.body.workspaceID}, function(err, work) {
        if (work.length == 0) {
            var workspace = new workspace_db({
                "workspaceID":req.body.workspaceID,
                "workspace_name":req.body.workspace_name
            });

            workspace.save(function (err, new_workspace) {
                if (!err) {
                    res.send("1" + new_workspace._id);
                }  else {
                    res.send("0Error: Database error");
                }
            });
        } else {
            res.send("0Error: Workspace already exists");
        }
    });

};

module.exports.log_in = function(req, res) {
    users_db.find({"email":req.body.email}, function(err, user_found) {
        if (user_found.length) {
            if (user_found[0].password == req.body.password) {
                var session = new sessions_db({"userID":user_found[0]._id});
                session.save(function (err, new_session) {
                    workspace_users_db.find({"userID":user_found[0]._id}, function(err, workspaceID_found) {
                        console.log(workspaceID_found);
                        res.cookie('workspaceID', workspaceID_found[0].workspaceID);
                        res.cookie('sessionID', new_session._id).send("1" + user_found[0]._id);
                    });
                });
            } else {
                res.send("0Error: Incorrect password");
            }
        } else {
            res.send("0Error: Email does not exist");
        }
    });
};

module.exports.add_user = function(req, res) {
    var workspace_user = new workspace_users_db({
        "workspaceID":req.body.workspaceID,
        "userID":req.body.userID,
        "user_role":req.body.user_role
    });

    workspace_user.save(function (err, new_workspace_user) {
        if (!err) {
            res.send("1");
        } else {
            res.send("0Error: Database error");
        }
    });
};

module.exports.get_workspace_id = function(req, res) {
    workspace_db.find({"workspaceID":req.params.workspaceID}, function(err, work) {
        if (work.length) {
            res.send("1" + work[0]._id);
        } else {
            res.send("0" + "Error: Workspace does not exist");
        }
    });
}

module.exports.forget_pwd = function(req, res) {
    res.render('./pages/forget_pwd', { link: "/"});
};

module.exports.signup = function(req, res){
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                res.redirect('/board_page');
            } else {
                res.render('./pages/signup', { link: "/"});
            }
        });
    } else {
        res.render('./pages/signup', { link: "/"});
    }
};

module.exports.board_page = function(req, res){
    var is_admin = "false";
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                workspace_users_db.find({"userID":sessions_found[0].userID}, function(err, workspaceID_found) {
                    if(workspaceID_found[0].user_role == "admin"){
                        is_admin = "true";
                    }
                    workspace_db.find({"_id":workspaceID_found[0].workspaceID}, function(err, workspace_found) {
                        res.render('./pages/board_page', { log_out_link: "/", workspace_name: workspace_found[0].workspace_name.toUpperCase(), isAdmin:is_admin});
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/');
    }
};

module.exports.logout = function(req, res) {
    sessions_db.remove({"_id":req.cookies.sessionID}, function(err) {
        if (!err) {
            res.clearCookie("sessionID");
            res.clearCookie("workspaceID")
            res.redirect("/");
        }
    });
}

module.exports.create_room = function(req, res) {
  res.render('./pages/newroom');
};



module.exports.sayGoodbye = function(req, res) {
    res.send("Goodbye");
};


module.exports.welcome = function(req, res) {
    if (req.cookies.sessionID != undefined) {
        sessions_db.find({"_id":req.cookies.sessionID}, function(err, sessions_found) {
            if (sessions_found.length) {
                users_db.find({"_id":sessions_found[0].userID}, function(err, users_found) {
                    workspace_users_db.find({"userID":users_found[0]._id}, function(err, workspaces_found) {
                        res.render('./pages/welcome_page', {firstname:users_found[0].firstname.toUpperCase(), workspaces:workspaces_found});
                    });
                });
            }
        });
    } else {
        res.render('./pages/login', { forget_pwd_link: "/forget_pwd",
            signup_link: "/signup", newroom_link: "/newroom"});
    }
};