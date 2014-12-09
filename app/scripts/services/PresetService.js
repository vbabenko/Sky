App.factory('PreSetFactory', ['$http', function($http) {

   return {
       /*
        'preSet': [
            {'name': 'X-Wing'},
            {'name': 'PreSet2'}
        ],

        'tests': [
            {'name': 'QtTest'},
            {'name': 'Test2'}
       ],    */
        'insertPlaceholder': function(obj, placeholder) {
            var placeholder = placeholder || 'Please, select a value';
            try {
                if (obj.constructor == Object) {
                    for (key in obj) {
                        obj[key].splice(0, 0, placeholder);
                    }
                } else {
                    obj.splice(0, 0, placeholder);
                }
                return obj;
            } catch (e) {
                console.log(e.message); // TO DO..
            }
        },
       'updateValueByKey': function update(obj, key, val) {
           try {
               for (var p in obj) {
                   if (obj[p].constructor != Object) {
                       if(p == key) {
                           obj[p] = val;
                       }
                   } else {
                       update(obj[p], key, val)
                   }
               }
           } catch (e) {
               console.log(e.message); // TO DO..
           }
       },
       'mergeObjects': function(obj1, obj2) {
           for (var key in obj2) {
               try {
                   // Property in destination object set; update its value.
                   if ( obj2[key].constructor == Object ) {
                       obj1[key] = mergeObjects(obj1[key], obj2[key]);
                   } else {
                       obj1[key] = obj2[key];
                   }
               } catch(e) {
                   // Property in destination object not set; create it and set its value.
                   obj1[key] = obj2[key];
               }
           }
           return obj1;
       },
       'getPreSet': function() {
            return $http({
               method: 'GET',
               url: 'http://demo8884132.mockable.io/test/presets'
           });
       },
       'getTests': function(testName) {
           return $http({
               method: 'GET',
               url: 'http://demo8884132.mockable.io/tests/'+ testName
           });
       }


   };

}]);