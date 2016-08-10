angular.module('starter.services', ['ngCordova'])

.factory('Vocs', ['$cordovaSQLite', function($cordovaSQLite) {
    var counter = 1;

    var vocs = [{
        id: 0,
        source: 'casa',
        dest: 'Haus',
        cat: 0
    }];


    return {
        all: function() {
            vocs = [{
                id: 0,
                source: 'casa',
                dest: 'Haus',
                cat: 0
            }];

            var query = "SELECT id, source, dest, cat FROM vocabulary;";
            $cordovaSQLite.execute(db, query).then(function(res) {
                if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) {
                        console.log("Row: " + res.rows.item(i).source);
                        vocs.push({ id: res.rows.item(i).id + 1, source: res.rows.item(i).source, dest: res.rows.item(i).dest, cat: res.rows.item(i).cat });
                    }
                    counter = res.rows.length;

                } else {
                    console.log("NO Rows found!");
                }
            }, function(err) {
                console.error(err);
            });

            return vocs;
        },
        
        cats: function() {
            var cats = [{
                id: 0,
                name: "Lesson 1"
            }, {
                id: 1,
                name: "Lesson 2"
            }, {
                id: 2,
                name: "Lesson 3"
            }, {
                id: 3,
                name: "Lesson 4"
            }, {
                id: 4,
                name: "Lesson 5"
            },{
                id: 5,
                name: "Lesson 6"
            },{
                id: 6,
                name: "Lesson 7"
            },{
                id: 7,
                name: "Lesson 8"
            },{
                id: 8,
                name: "Lesson 9"
            }];

            return cats;
        },

        remove: function(voc) {
            vocs.splice(vocs.indexOf(voc), 1);
        },
        
        get: function(vocId) {
            for (var i = 0; i < vocs.length; i++) {
                if (vocs[i].id === parseInt(vocId)) {
                    return vocs[i];
                }
            }
            return null;
        },
        
        save: function(voc) {
            for (var i = 0; i < vocs.length; i++) {
                if (vocs[i].id === parseInt(voc.id)) {
                    vocs[i].source = voc.source;
                    vocs[i].dest = voc.dest;
                    vocs[i].cat = voc.cat;
                }
            }
        },
        
        insert: function(voc) {
            var query = "INSERT INTO vocabulary (source, dest, cat) VALUES (?, ?, ?)";
            $cordovaSQLite.execute(db, query, [voc.source, voc.dest, voc.cat]).then(function(res) {
                console.log("INSERT ID -> " + res.insertId);
            }, function(err) {
                console.error(err);
            });

            counter++;
            voc.id = counter;
            vocs.push(voc); 
            console.log("end of insert----");
        }

    };
}]);