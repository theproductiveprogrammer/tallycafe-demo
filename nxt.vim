" Sets up the vim environment to switch to the next git
" step (using ./nxt shell script)
" Autoread makes the system load the correct file
" automatically
set autoread

function! DemoNextStep ()
    silent !./nxt
endfunction

noremap <silent> ,<F2> :call DemoNextStep()<CR>
