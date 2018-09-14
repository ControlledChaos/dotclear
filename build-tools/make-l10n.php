#!/usr/bin/env php
<?php
$license_block = <<<EOF
/**
 * @package Dotclear
 *
 * @copyright Olivier Meunier & Association Dotclear
 * @copyright GPL-2.0-only
 */
EOF;

require dirname(__FILE__) . '/../inc/libs/clearbricks/common/lib.l10n.php';

$path = (!empty($_SERVER['argv'][1])) ? $_SERVER['argv'][1] : getcwd();
$path = realpath($path);

$cmd = 'find ' . $path . ' -type f -name \'*.po\'';
exec($cmd, $eres, $ret);

$res = [];

foreach ($eres as $f) {
    $dest = dirname($f) . '/' . basename($f, '.po') . '.lang.php';
    echo "l10n file " . $dest . ": ";

    if (l10n::generatePhpFileFromPo(dirname($f) . '/' . basename($f, '.po'), $license_block)) {
        echo 'OK';
    } else {
        echo 'FAILED';
    }
    echo "\n";
}
?>
