@extends('layouts.default')

@section('content')
<div class="container">
<h3>{{ __('Most rescent threads') }}</h3>
    <threads
        title="{{ __('Threads') }}"
        threads="{{ __('Threads') }}"
        replies="{{ __('Replies') }}"
        open="{{ __('Open') }}"
    >
        @include('layouts.default.preloader')
    </threads>
</div>
@endsection

@section('scripts')
<script src="/js/threads.js"></script>
@endsection
