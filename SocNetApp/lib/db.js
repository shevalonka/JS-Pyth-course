import sqlite3 from "sqlite3"

let db = new sqlite3.Database('database.db');

function createUser(user){
    return new Promise((resolve, reject)=>{
        db.run("INSERT INTO users (name, last_name, password, email) VALUES (?,?,?,?)",
        [user.name, user.surname, user.password, user.email],
        function(err){
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

function getNameByUserId(user_id){
    return new Promise((resolve, reject)=>{
        db.get("SELECT name FROM users WHERE user_id =?",
            [user_id],
            function (err, row) {
                if (err){
                    reject(err);
                }else{
                    console.log(row);
                    resolve(row.name);
                }
            });
    })

}

function getUserByEmail(email){
    return new Promise((resolve, reject)=>{
        db.get("SELECT * from users WHERE email = ?",
        [email],
        function(err, row){
            if(err){
                reject(err);
            } else {
                resolve(row);
            }
        });
    })
}

function createPost(body, user_id){
    return new Promise((resolve, reject)=>{
        db.run("INSERT INTO posts (body, user_id) VALUES (?,?)",
        [body, user_id],
        function(err){
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    })
}


function getUsers(){
    return new Promise((resolve, reject)=>{
        db.all("SELECT * from users",
        [],
        function(err, rows){
            if(err){
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}

function follow(follower, followed){
    return new Promise((resolve, reject)=>{
        db.run("INSERT INTO follows (followeR_id, followeD_id) VALUES (?,?)",
        [follower, followed],
        function(err){
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

function unfollow(follower, followed){
    return new Promise((resolve, reject)=>{
        db.run("DELETE FROM follows WHERE followeR_id = ? AND followeD_id = ?",
        [follower, followed],
        function(err){
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


function getFollowed(user_id){
return new Promise((resolve, reject)=>{
db.all("SELECT followeD_id from follows WHERE followeR_id = ?",
[user_id],
function(err, rows){
if(err){
    reject(err);
} else {
    resolve(rows);
}
});
})
}

function getFollowedPosts(user_id){
return new Promise((resolve, reject)=>{
db.all(`SELECT p.body, u.name FROM follows
JOIN posts AS p ON followeD_id = p.user_id
JOIN users AS u ON p.user_id = u.user_id
WHERE followeR_id = ?`,
[user_id],
function(err, rows){
if(err){
    reject(err);
} else {
    resolve(rows);
}
});
})
}


export {createUser, createPost, getUserByEmail, getUsers, follow, unfollow, getFollowed, getFollowedPosts};
