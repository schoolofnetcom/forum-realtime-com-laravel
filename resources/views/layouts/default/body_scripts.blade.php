<script src="/js/manifest.js"></script>
<script src="/js/vendor.js"></script>
<script src="/js/bootstrap.js"></script>
<script>
window.user = {!! \Auth::user() !!};
</script>

{{ $slot }}
