const blockedCLass = require('./tableClasses/blockedClass');
const chatroomsCLass = require('./tableClasses/chatroomsClass');
const imagesCLass = require('./tableClasses/imagesClass');
const likesCLass = require('./tableClasses/likesClass');
const locationsCLass = require('./tableClasses/locationsClass');
const pingCLass = require('./tableClasses/pingClass');
const tagsCLass = require('./tableClasses/tagsClass');
const usersCLass = require('./tableClasses/usersClass');
const viewedClass = require('./tableClasses/viewedClass');

class chatAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.blocked = new blockedCLass.blocked(senpai);
        this.chatrooms = new chatroomsCLass.chatrooms(senpai);
        this.images = new imagesCLass.images(senpai);
        this.likes = new likesCLass.likes(senpai);
        this.locations = new locationsCLass.locations(senpai);
        this.ping = new pingCLass.ping(senpai);
        this.tags = new tagsCLass.tags(senpai);
        this.users = new usersCLass.users(senpai);
        this.viewed = new viewedClass.viewed(senpai);
    }
        
    query(req, res){
        res.json(this.test());
    }

    test(){
        return ('chatAPI online');
    }
    
}

module.exports = { chatAPI };