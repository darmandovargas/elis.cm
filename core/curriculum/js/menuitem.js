/**
 * ELIS(TM): Enterprise Learning Intelligence Suite
 * Copyright (C) 2008-2012 Remote Learner.net Inc http://www.remote-learner.net
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package    elis
 * @subpackage curriculummanagement
 * @author     Remote-Learner.net Inc
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL
 * @copyright  (C) 2008-2012 Remote Learner.net Inc http://www.remote-learner.net
 *
 */

/**
 * Function for handling dynamic node loading
 *
 * @param  Object    node            The node whose children we are loading
 * @param  function  fnLoadComplete  The function to call which will signify that loading is done
 */
function loadNodeData(node, fnLoadComplete) {
	
	//URL of our script (wwwroot is pre-set by the calling PHP script)
	var url = wwwroot + '/blocks/curr_admin/load_menu.php?data=' + node.contentElId;

	var callback = {
	
	    //success function
	    success: function(o) {

            //YUI can fire multiple expand events for the same node
            //so make sure it hasn't already been loaded
		    if(o.responseText != '' && node.children == '') {
		        var responseObject = YAHOO.lang.JSON.parse(o.responseText);
		    
		        //loop through and append new child nodes
		        for(var i = 0; i < responseObject.children.length; i++) {
		            var childObject = responseObject.children[i];
		            
		            //this actually creates the node in the menu
                    var newNode = new YAHOO.widget.TextNode(childObject.label, node);
                    
                    //information about parent elements is held in this value
                    newNode.contentElId = childObject.contentElId;
                    
                    //CSS styling
                    newNode.labelStyle = childObject.labelStyle;
                    
                    //specifies if we should not show the + icon
                    newNode.isLeaf = childObject.isLeaf;
		        }
		    }
		    
		    //indicate that loading is complete
		    fnLoadComplete();
	    },
	    
	    //failure function
	    failure: function(o) {
	    
	        //DO NOT warn the user in any way because this failure can happen
	    	//in an innocuous way if you navigate to another page while the menu is loading
	    	
	    	//indicate that loading is complete
	    	fnLoadComplete();
	    }
         
	}

	//make the actual call
	YAHOO.util.Connect.asyncRequest('GET', url, callback);
}

/**
 * Render the tree that represents the curriculum admin menu
 *
 * @param  object  tree_object  The object representing tree contents
 */
function render_curr_admin_tree(tree_object) {
	
	var curr_admin_tree = new YAHOO.widget.TreeView("block_curr_admin_tree", tree_object.children);
	
	//set up dynamic loading
	curr_admin_tree.setDynamicLoad(loadNodeData);
	
	curr_admin_tree.render();

}
