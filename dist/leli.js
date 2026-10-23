/**
 * ==========================================================================
 * leliUI - Interactive Runtime & Component Engine v1.0.6
 * Zero-dependency, accessible, event-delegated JavaScript engine for leliUI
 * ==========================================================================
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.LeliUI = factory()));
})(this, function () {
  'use strict';

  /**
   * 1. Fallback for browsers that do not support `hidden="until-found"`
   */
  function initHiddenUntilFoundFallback(root = document) {
    if (typeof HTMLElement !== 'undefined' && !('onbeforematch' in HTMLElement.prototype)) {
      root.querySelectorAll('[hidden="until-found"]').forEach((el) => {
        el.setAttribute('hidden', '');
      });
    }
  }

  /**
   * 2. Tabs Component Controller
   * Supports click, keyboard navigation (Left/Right/Up/Down/Home/End), and `beforematch` find-in-page reveal.
   */
  const Tabs = {
    activate(tabButton) {
      if (!tabButton || tabButton.disabled) return;
      const tabContainer = tabButton.closest('.leli-tabs');
      if (!tabContainer) return;

      const tabList = tabButton.closest('.leli-tab-list') || tabContainer;
      const tabs = Array.from(tabList.querySelectorAll('.leli-tab'));
      const targetId = tabButton.getAttribute('aria-controls') || tabButton.dataset.tabTarget;

      tabs.forEach((btn) => {
        const isCurrent = btn === tabButton;
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        btn.setAttribute('tabindex', isCurrent ? '0' : '-1');
        btn.classList.toggle('is-active', isCurrent);
      });

      const panels = Array.from(tabContainer.querySelectorAll(':scope > .leli-tab-panel, :scope > .leli-tab-panels > .leli-tab-panel'));
      panels.forEach((panel) => {
        const isTarget = panel.id === targetId || panel.dataset.tabPanel === targetId;
        if (isTarget) {
          panel.removeAttribute('hidden');
        } else {
          if (typeof HTMLElement !== 'undefined' && 'onbeforematch' in HTMLElement.prototype) {
            panel.setAttribute('hidden', 'until-found');
          } else {
            panel.setAttribute('hidden', '');
          }
        }
      });

      tabContainer.dispatchEvent(
        new CustomEvent('leli:tab-change', {
          bubbles: true,
          detail: { activeTab: tabButton, targetId }
        })
      );
    },

    init(root = document) {
      root.querySelectorAll('.leli-tabs').forEach((tabContainer) => {
        if (tabContainer.dataset.leliBound) return;
        tabContainer.dataset.leliBound = 'true';

        tabContainer.addEventListener('beforematch', (e) => {
          const matchedPanel = e.target.closest('.leli-tab-panel');
          if (!matchedPanel) return;
          const panelId = matchedPanel.id;
          const controllerBtn = tabContainer.querySelector(
            `.leli-tab[aria-controls="${panelId}"], .leli-tab[data-tab-target="${panelId}"]`
          );
          if (controllerBtn) {
            Tabs.activate(controllerBtn);
          }
        });
      });
    }
  };

  /**
   * 3. Table Component Controller
   * Auto-injects `--label-N` CSS variables on `.leli-table` from `<thead>` for Container Query mobile cards,
   * and enables interactive column sorting on `th[data-sortable="true"]`.
   */
  const Table = {
    syncLabels(tableEl) {
      const headers = tableEl.querySelectorAll('thead th');
      headers.forEach((th, index) => {
        const label = th.textContent.trim();
        tableEl.style.setProperty(`--label-${index + 1}`, `"${label.replace(/"/g, '\\"')}"`);
      });
    },

    sortByColumn(thEl) {
      const table = thEl.closest('.leli-table');
      if (!table) return;
      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      const headers = Array.from(thEl.parentElement.children);
      const colIndex = headers.indexOf(thEl);
      const currentSort = thEl.getAttribute('aria-sort');
      const nextSort = currentSort === 'ascending' ? 'descending' : 'ascending';

      headers.forEach((h) => {
        if (h !== thEl && h.hasAttribute('data-sortable')) {
          h.removeAttribute('aria-sort');
        }
      });
      thEl.setAttribute('aria-sort', nextSort);

      const rows = Array.from(tbody.querySelectorAll('tr'));
      const dir = nextSort === 'ascending' ? 1 : -1;

      rows.sort((rowA, rowB) => {
        const cellA = rowA.children[colIndex]?.textContent.trim() || '';
        const cellB = rowB.children[colIndex]?.textContent.trim() || '';

        const numA = parseFloat(cellA.replace(/[^0-9.-]+/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]+/g, ''));

        if (!Number.isNaN(numA) && !Number.isNaN(numB) && /^[$€£₺0-9.,%\s+-]+$/.test(cellA)) {
          return (numA - numB) * dir;
        }
        return cellA.localeCompare(cellB, 'tr', { numeric: true, sensitivity: 'base' }) * dir;
      });

      rows.forEach((row) => tbody.appendChild(row));

      table.dispatchEvent(
        new CustomEvent('leli:table-sort', {
          bubbles: true,
          detail: { column: colIndex, direction: nextSort, header: thEl }
        })
      );
    },

    init(root = document) {
      root.querySelectorAll('.leli-table').forEach((table) => {
        Table.syncLabels(table);
      });
    }
  };

  /**
   * 4. Pagination Component Controller
   */
  const Pagination = {
    setPage(paginationEl, pageNumber) {
      if (!paginationEl) return;
      const items = Array.from(paginationEl.querySelectorAll('.leli-page-item[data-page]'));
      const totalPages = items.length;
      const targetPage = Math.max(1, Math.min(totalPages || 999, Number(pageNumber)));

      items.forEach((item) => {
        const isCurrent = Number(item.dataset.page) === targetPage;
        if (isCurrent) {
          item.setAttribute('aria-current', 'page');
          item.classList.add('is-active');
        } else {
          item.removeAttribute('aria-current');
          item.classList.remove('is-active');
        }
      });

      const prevBtn = paginationEl.querySelector('[data-page-action="prev"]');
      const nextBtn = paginationEl.querySelector('[data-page-action="next"]');
      if (prevBtn) prevBtn.disabled = targetPage <= 1;
      if (nextBtn && totalPages > 0) nextBtn.disabled = targetPage >= totalPages;

      paginationEl.dataset.currentPage = String(targetPage);
      paginationEl.dispatchEvent(
        new CustomEvent('leli:page-change', {
          bubbles: true,
          detail: { page: targetPage }
        })
      );
    }
  };

  /**
   * 5. Progress Bar Controller
   */
  const Progress = {
    setValue(progressEl, value) {
      if (!progressEl) return;
      const clamped = Math.max(0, Math.min(100, Number(value)));
      progressEl.style.setProperty('--progress-value', `${clamped}%`);
      progressEl.setAttribute('aria-valuenow', String(clamped));

      const group = progressEl.closest('.leli-progress-group');
      if (group) {
        const label = group.querySelector('.leli-progress-value');
        if (label) label.textContent = `${clamped}%`;
      }
      const innerBar = progressEl.querySelector('.leli-progress-bar[data-show-label="true"]');
      if (innerBar) {
        innerBar.textContent = `${clamped}%`;
      }
    }
  };

  /**
   * 6. Modal / Dialog Controller
   * Modern <dialog> management with @starting-style exit animation,
   * light dismiss (closedby="any") and fallback click-outside detection.
   */
  const Modal = {
    open(target) {
      const dialog = typeof target === 'string' ? document.getElementById(target) : target;
      if (!dialog || typeof dialog.showModal !== 'function') return;

      dialog.removeAttribute('data-closing');
      dialog.showModal();

      dialog.dispatchEvent(new CustomEvent('leli:modal-open', { bubbles: true, detail: { dialog } }));
    },

    async close(target) {
      const dialog = typeof target === 'string' ? document.getElementById(target) : target;
      if (!dialog || !dialog.open) return;

      // Add closing animation state
      dialog.setAttribute('data-closing', '');
      const animations = typeof dialog.getAnimations === 'function' ? dialog.getAnimations({ subtree: true }) : [];
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => setTimeout(r, 250))
        ]);
      } else {
        await new Promise((r) => setTimeout(r, 200));
      }

      dialog.removeAttribute('data-closing');
      dialog.close();
      dialog.dispatchEvent(new CustomEvent('leli:modal-close', { bubbles: true, detail: { dialog } }));
    },

    init(root = document) {
      // Light-dismiss fallback for browsers without native `closedby="any"`
      root.querySelectorAll('dialog.leli-modal').forEach((dialog) => {
        if (dialog.dataset.leliModalBound) return;
        dialog.dataset.leliModalBound = 'true';

        // Light dismiss fallback
        if (typeof HTMLDialogElement !== 'undefined' && !('closedBy' in HTMLDialogElement.prototype)) {
          dialog.addEventListener('click', (event) => {
            if (event.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            const isInside =
              rect.top <= event.clientY &&
              event.clientY <= rect.top + rect.height &&
              rect.left <= event.clientX &&
              event.clientX <= rect.left + rect.width;

            if (!isInside) {
              Modal.close(dialog);
            }
          });
        }

        // Animate native cancel/Esc key requests
        dialog.addEventListener('cancel', (e) => {
          e.preventDefault();
          Modal.close(dialog);
        });
      });
    }
  };

  /**
   * 7. Toast Notification Engine
   */
  const Toast = {
    getContainer(position = 'top-right') {
      let container = document.querySelector(`.leli-toast-container.position-${position}`);
      if (!container) {
        container = document.createElement('div');
        container.className = `leli-toast-container position-${position}`;
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
      }
      return container;
    },

    show(options = {}) {
      if (typeof document === 'undefined') return;
      const {
        title = '',
        message = '',
        type = 'primary', // primary, success, warning, danger
        duration = 4000,
        position = 'top-right',
        dismissible = true
      } = options;

      const container = Toast.getContainer(position);
      const toastEl = document.createElement('div');
      toastEl.className = `leli-toast leli-toast-${type}`;
      toastEl.setAttribute('role', 'alert');
      toastEl.dataset.variant = type;

      const icons = {
        primary: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        success: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        warning: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        danger: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
      };

      const iconSvg = icons[type] || icons.primary;

      let html = `
        <span class="leli-toast-icon">${iconSvg}</span>
        <div class="leli-toast-content">
          ${title ? `<div class="leli-toast-title">${title}</div>` : ''}
          <div class="leli-toast-message">${message}</div>
        </div>
      `;

      if (dismissible) {
        html += `<button type="button" class="leli-toast-close" aria-label="Dismiss">&times;</button>`;
      }

      if (duration > 0) {
        html += `<div class="leli-toast-progress" style="animation-duration: ${duration}ms;"></div>`;
      }

      toastEl.innerHTML = html;
      container.appendChild(toastEl);

      const dismiss = () => {
        toastEl.classList.add('is-leaving');
        setTimeout(() => {
          if (toastEl.parentElement) toastEl.remove();
        }, 250);
      };

      const closeBtn = toastEl.querySelector('.leli-toast-close');
      if (closeBtn) closeBtn.addEventListener('click', dismiss);

      if (duration > 0) {
        setTimeout(dismiss, duration);
      }

      return { el: toastEl, dismiss };
    },

    success(message, title = 'Success') {
      return Toast.show({ message, title, type: 'success' });
    },
    error(message, title = 'Error') {
      return Toast.show({ message, title, type: 'danger' });
    },
    warning(message, title = 'Warning') {
      return Toast.show({ message, title, type: 'warning' });
    },
    info(message, title = 'Information') {
      return Toast.show({ message, title, type: 'primary' });
    }
  };

  /**
   * 8. Theme Manager (Dark mode default)
   */
  const Theme = {
    get() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },
    set(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('leli-theme', mode);
      }
      document.dispatchEvent(new CustomEvent('leli:theme-change', { detail: { theme: mode } }));
    },
    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      Theme.set(next);
      return next;
    },
    init() {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('leli-theme') : null;
      const initial = saved === 'light' || saved === 'dark' ? saved : 'dark';
      document.documentElement.setAttribute('data-theme', initial);
    }
  };

  /**
   * 9. Form Validation & ARIA Sync
   * Syncs aria-invalid with the modern CSS :user-invalid state
   */
  const FormValidation = {
    syncAria(input) {
      if (!input || !input.checkValidity) return;
      const isUserInvalid = input.matches && input.matches(':user-invalid');
      if (isUserInvalid) {
        input.setAttribute('aria-invalid', 'true');
      } else if (input.hasAttribute('aria-invalid')) {
        input.removeAttribute('aria-invalid');
      }
    },

    init(root = document) {
      root.addEventListener('blur', (e) => {
        FormValidation.syncAria(e.target);
      }, true);

      root.addEventListener('input', (e) => {
        if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) {
          FormValidation.syncAria(e.target);
        }
      });
    }
  };

  /**
   * 10. Dropdown Component Controller
   * Interactive dropdown context menus with keyboard accessibility, escape dismiss, and event dispatch
   */
  const Dropdown = {
    open(dropdownEl) {
      if (!dropdownEl) return;
      Dropdown.closeAll(dropdownEl);
      dropdownEl.classList.add('is-open');
      const trigger = dropdownEl.querySelector('.leli-dropdown-trigger, button, [data-dropdown-toggle]');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      const menu = dropdownEl.querySelector('.leli-dropdown-menu');
      if (menu) menu.setAttribute('aria-hidden', 'false');
      dropdownEl.dispatchEvent(new CustomEvent('leli:dropdown-open', { bubbles: true }));
    },

    close(dropdownEl) {
      if (!dropdownEl) return;
      dropdownEl.classList.remove('is-open');
      const trigger = dropdownEl.querySelector('.leli-dropdown-trigger, button, [data-dropdown-toggle]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      const menu = dropdownEl.querySelector('.leli-dropdown-menu');
      if (menu) menu.setAttribute('aria-hidden', 'true');
      dropdownEl.dispatchEvent(new CustomEvent('leli:dropdown-close', { bubbles: true }));
    },

    toggle(dropdownEl) {
      if (!dropdownEl) return;
      if (dropdownEl.classList.contains('is-open')) {
        Dropdown.close(dropdownEl);
      } else {
        Dropdown.open(dropdownEl);
      }
    },

    closeAll(exceptEl = null) {
      document.querySelectorAll('.leli-dropdown.is-open').forEach((el) => {
        if (el !== exceptEl && !el.contains(exceptEl)) {
          Dropdown.close(el);
        }
      });
    }
  };

  /**
   * 11. Drawer & Sheet Component Controller
   * Manages slide-in offcanvas panels (HTML5 <dialog> and standard elements)
   */
  const Drawer = {
    open(target) {
      const drawer = typeof target === 'string' ? document.getElementById(target) : target;
      if (!drawer) return;

      if (drawer.tagName === 'DIALOG' && typeof drawer.showModal === 'function') {
        if (!drawer.open) drawer.showModal();
      } else {
        drawer.classList.add('is-open');
        const backdrop = drawer.dataset.backdrop
          ? document.getElementById(drawer.dataset.backdrop)
          : document.querySelector(`.leli-drawer-backdrop[data-drawer-for="${drawer.id}"]`);
        if (backdrop) backdrop.classList.add('is-open');
      }

      document.body.style.overflow = 'hidden';
      drawer.dispatchEvent(new CustomEvent('leli:drawer-open', { bubbles: true }));
    },

    close(target) {
      const drawer = typeof target === 'string' ? document.getElementById(target) : target;
      if (!drawer) return;

      if (drawer.tagName === 'DIALOG' && typeof drawer.close === 'function') {
        if (drawer.open) drawer.close();
      } else {
        drawer.classList.remove('is-open');
        const backdrop = drawer.dataset.backdrop
          ? document.getElementById(drawer.dataset.backdrop)
          : document.querySelector(`.leli-drawer-backdrop[data-drawer-for="${drawer.id}"]`);
        if (backdrop) backdrop.classList.remove('is-open');
      }

      const anyOtherOpen = document.querySelector('dialog[open], .leli-drawer.is-open');
      if (!anyOtherOpen) {
        document.body.style.overflow = '';
      }
      drawer.dispatchEvent(new CustomEvent('leli:drawer-close', { bubbles: true }));
    },

    toggle(target) {
      const drawer = typeof target === 'string' ? document.getElementById(target) : target;
      if (!drawer) return;
      const isOpen = drawer.tagName === 'DIALOG' ? drawer.open : drawer.classList.contains('is-open');
      if (isOpen) {
        Drawer.close(drawer);
      } else {
        Drawer.open(drawer);
      }
    },

    init(root = document) {
      root.querySelectorAll('dialog.leli-drawer').forEach((drawer) => {
        if (drawer.dataset.leliBound) return;
        drawer.dataset.leliBound = 'true';

        drawer.addEventListener('click', (e) => {
          const rect = drawer.getBoundingClientRect();
          const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;
          if (clickedOutside) {
            Drawer.close(drawer);
          }
        });

        drawer.addEventListener('close', () => {
          const anyOtherOpen = document.querySelector('dialog[open], .leli-drawer.is-open');
          if (!anyOtherOpen) {
            document.body.style.overflow = '';
          }
        });
      });
    }
  };

  /**
   * 12. Alert Component Controller
   * Handles dismissible alert banners with smooth collapsing animations
   */
  const Alert = {
    dismiss(alertEl) {
      if (!alertEl) return;
      alertEl.classList.add('is-dismissing');
      alertEl.dispatchEvent(new CustomEvent('leli:alert-dismiss', { bubbles: true }));
      setTimeout(() => {
        alertEl.remove();
      }, 240);
    }
  };

  /**
   * Global Event Delegation for Zero-Config Component Usage
   */
  function bindGlobalEvents() {
    if (typeof document === 'undefined' || document.documentElement.dataset.leliEventsBound) return;
    document.documentElement.dataset.leliEventsBound = 'true';

    document.addEventListener('click', (e) => {
      // 1. Tab Click
      const tabBtn = e.target.closest('.leli-tab');
      if (tabBtn) {
        Tabs.activate(tabBtn);
        return;
      }

      // 2. Sortable Table Column Click
      const sortableTh = e.target.closest('.leli-table th[data-sortable="true"]');
      if (sortableTh) {
        Table.sortByColumn(sortableTh);
        return;
      }

      // 3. Pagination Click
      const pageItem = e.target.closest('.leli-page-item');
      if (pageItem) {
        const pagination = pageItem.closest('.leli-pagination');
        if (!pagination) return;
        if (pageItem.dataset.page) {
          Pagination.setPage(pagination, Number(pageItem.dataset.page));
        } else if (pageItem.dataset.pageAction) {
          const current = Number(pagination.dataset.currentPage || 1);
          const next = pageItem.dataset.pageAction === 'prev' ? current - 1 : current + 1;
          Pagination.setPage(pagination, next);
        }
        return;
      }

      // 4. Modal Open Button Click (data-modal-target="myDialogId")
      const modalOpenTrigger = e.target.closest('[data-modal-target], [data-modal-open]');
      if (modalOpenTrigger) {
        const targetId = modalOpenTrigger.dataset.modalTarget || modalOpenTrigger.dataset.modalOpen;
        if (targetId) {
          Modal.open(targetId);
        }
        return;
      }

      // 5. Modal Close Button Click (inside dialog or with data-modal-close)
      const modalCloseTrigger = e.target.closest('.leli-modal-close, [data-modal-close]');
      if (modalCloseTrigger) {
        const dialog = modalCloseTrigger.closest('dialog.leli-modal') ||
          (modalCloseTrigger.dataset.modalClose ? document.getElementById(modalCloseTrigger.dataset.modalClose) : null);
        if (dialog) {
          Modal.close(dialog);
        }
        return;
      }

      // 6. Dropdown Trigger Click
      const dropdownTrigger = e.target.closest('.leli-dropdown-trigger, [data-dropdown-toggle]');
      if (dropdownTrigger) {
        const dropdown = dropdownTrigger.closest('.leli-dropdown') ||
          (dropdownTrigger.dataset.dropdownToggle ? document.getElementById(dropdownTrigger.dataset.dropdownToggle) : null);
        if (dropdown) {
          e.preventDefault();
          Dropdown.toggle(dropdown);
          return;
        }
      }

      // 7. Dropdown Outside Click Dismiss
      if (!e.target.closest('.leli-dropdown')) {
        Dropdown.closeAll();
      }

      // 8. Drawer Open Trigger Click
      const drawerOpenTrigger = e.target.closest('[data-drawer-target], [data-drawer-open]');
      if (drawerOpenTrigger) {
        const targetId = drawerOpenTrigger.dataset.drawerTarget || drawerOpenTrigger.dataset.drawerOpen;
        if (targetId) {
          e.preventDefault();
          Drawer.open(targetId);
        }
        return;
      }

      // 9. Drawer Close Trigger Click
      const drawerCloseTrigger = e.target.closest('.leli-drawer-close, [data-drawer-close]');
      if (drawerCloseTrigger) {
        const drawer = drawerCloseTrigger.closest('.leli-drawer, dialog.leli-drawer') ||
          (drawerCloseTrigger.dataset.drawerClose ? document.getElementById(drawerCloseTrigger.dataset.drawerClose) : null);
        if (drawer) {
          e.preventDefault();
          Drawer.close(drawer);
        }
        return;
      }

      // 10. Drawer Standalone Backdrop Click
      if (e.target.matches && e.target.matches('.leli-drawer-backdrop')) {
        const targetDrawerId = e.target.dataset.drawerFor;
        if (targetDrawerId) {
          Drawer.close(targetDrawerId);
        } else {
          document.querySelectorAll('.leli-drawer.is-open').forEach((d) => Drawer.close(d));
        }
        return;
      }

      // 11. Alert Dismiss Button Click
      const alertCloseBtn = e.target.closest('.leli-alert-close, [data-alert-dismiss]');
      if (alertCloseBtn) {
        const alertEl = alertCloseBtn.closest('.leli-alert');
        if (alertEl) {
          e.preventDefault();
          Alert.dismiss(alertEl);
        }
        return;
      }
    });

    // Keyboard navigation (Escape to dismiss, Arrow keys for Tabs & Dropdown items)
    document.addEventListener('keydown', (e) => {
      // Escape key handler
      if (e.key === 'Escape') {
        Dropdown.closeAll();
        document.querySelectorAll('.leli-drawer.is-open').forEach((d) => Drawer.close(d));
        return;
      }

      // Dropdown arrow navigation
      const activeDropdown = document.querySelector('.leli-dropdown.is-open');
      if (activeDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        const items = Array.from(activeDropdown.querySelectorAll('.leli-dropdown-item:not(:disabled)'));
        if (items.length > 0) {
          e.preventDefault();
          const currentIndex = items.indexOf(document.activeElement);
          let nextIndex = 0;
          if (e.key === 'ArrowDown') {
            nextIndex = currentIndex === -1 || currentIndex === items.length - 1 ? 0 : currentIndex + 1;
          } else {
            nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
          }
          items[nextIndex].focus();
          return;
        }
      }

      // Tabs arrow navigation
      const tabBtn = e.target.closest('.leli-tab');
      if (!tabBtn) return;

      const tabList = tabBtn.closest('.leli-tab-list');
      if (!tabList) return;

      const enabledTabs = Array.from(tabList.querySelectorAll('.leli-tab:not(:disabled)'));
      const index = enabledTabs.indexOf(tabBtn);
      if (index === -1) return;

      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (index + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (index - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = enabledTabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        enabledTabs[nextIndex].focus();
        Tabs.activate(enabledTabs[nextIndex]);
      }
    });
  }

  function initAll(root = document) {
    if (typeof document === 'undefined') return;
    Theme.init();
    initHiddenUntilFoundFallback(root);
    Tabs.init(root);
    Table.init(root);
    Modal.init(root);
    Drawer.init(root);
    FormValidation.init(root);
    bindGlobalEvents();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initAll());
    } else {
      initAll();
    }
  }

  return {
    version: '1.0.15',
    init: initAll,
    Tabs,
    Table,
    Pagination,
    Progress,
    Modal,
    Toast,
    Dropdown,
    Drawer,
    Alert,
    Theme,
    FormValidation
  };
});
