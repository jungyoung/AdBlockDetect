# AdBlockDetect
Pure javascript ad block detect

basic AD target : google adsens

Supported browsers for the AdSense interface
https://support.google.com/adsense/answer/191268?hl=en

EX)
<code>
<script src="AdBlockDetect.js"></script>
<script type="text/javascript">
AdBlockDetect(function(isBlock) {
    if (isBlock) {
        console.log('Ad block!');
    } else {
        console.log('Ad execute~');
    }
});
</script>
</code>
