import Swal from 'sweetalert2';

/**
 * Class used to display SweetAlerts.
 */
class Alert {
  private Toast;
  private Swal;

  /**
   * Class constructor.
   *
   * @param {Swal} sweetalert
   */
  constructor(sweetalert: any) {
    this.Swal = sweetalert;
    this.Toast = sweetalert.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000
    });
  }

  /**
   * Indicates a successful or positive action.
   *
   * @param {string} text
   * @returns {void}
   */
  success(text: string): void {
    this.Swal.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 3000
    });
  }

  /**
   * Indicates a dangerous or potentially negative action.
   *
   * @param {string} text
   * @returns {void}
   */
  error(text: string): void {
    this.Swal.fire({
      icon: 'error',
      title: text,
      showConfirmButton: false,
      timer: 3000
    });
  }

  /**
   * Use Toast config to display alerts.
   *
   * @param {'success'|'error'} icon
   * @param {string} title
   * @returns {void}
   */
  toast(icon: 'success'|'error', title: string): void {
    this.Toast.fire({
      icon,
      title
    });
  }
}

/**
 * Exporting a single instance of Alert class.
 */
export const alert = new Alert(Swal);
