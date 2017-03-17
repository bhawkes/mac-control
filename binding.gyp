{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs" : [
    		"<!(node -e \"require('nan')\")"
       ],
       "conditions": [
	      ['OS == "mac"', {
		      'include_dirs': [
		          'System/Library/Frameworks/CoreFoundation.Framework/Headers',
		          'System/Library/Frameworks/Carbon.Framework/Headers',
		          'System/Library/Frameworks/ApplicationServices.framework/Headers',
		          'System/Library/Frameworks/OpenGL.framework/Headers',
		        ],
		      "link_settings": {
	                            "libraries": [
	                                "-framework Carbon",
	                                "-framework CoreFoundation",
	                                "-framework ApplicationServices",
	                               	"-framework OpenGL"
	                            ]
	                        }
	            }
	          ]
	        ],
    }
  ]
}