export function showModal(content) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      ${content}
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close').onclick = () => modal.remove();
}
