<?php
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

require_once("config.php");
require_once CURMAN_DIRLOCATION . '/lib/moodlecourseurl.class.php';

$class      = required_param('class', PARAM_CLEAN);

if ($CFG->forcelogin) {
    require_login();
}

if (!$site = get_site()) {
    error('Site isn\'t defined!');
}

if (!empty($class)) {
    $templatetype = new $class();

    switch ($class) {
        case 'moodlecourseurl':
            $category   = optional_param('category', 0, PARAM_INT);
            $selected   = optional_param('selected', 0, PARAM_INT);
            $templatetype->displayPage($category, $selected);
            break;
        case 'moodlebackupfile':
            // not implemented yet
        default:
            break;
    }
}
?>