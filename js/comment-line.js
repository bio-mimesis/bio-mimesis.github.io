let commentLine = document.getElementById("comment-line");
let defaultComment = commentLine.textContent;

document.querySelectorAll("[data-comment]").forEach(commentNode => {
    commentNode.addEventListener("pointerover", (event) => {
        commentLine.textContent = commentNode.getAttribute("data-comment");
    });
    commentNode.addEventListener("pointerout", (event) => {
        commentLine.textContent = defaultComment;
    });
})
// Add a monospaced font for use with comment
// why does the word statuscafe look weird??
// remembe rto set word wrap for small viewport
// Change height of sidebar flex
// https://stackoverflow.com/questions/54924823/is-there-a-way-to-import-html-into-an-html-file
// Mad cheap!
// Need padding between scroll bar and body!
// Is pointerover/out working ok on mobile? https://stackoverflow.com/questions/75974325/how-to-make-hover-work-correct-for-mobile