import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject, take } from 'rxjs';
import {
  AddPriceListItem,
  AddShowForm,
  FetchedMovie,
  FetchedScreen,
  Show,
  TicketType,
} from '../../admin.interface';
import { AdminPanelService } from '../../admin.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-show-form[movies][screens]',
  templateUrl: './add-show-form.component.html',
  styleUrls: ['./add-show-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddShowFormComponent {
  @Input() movies!: FetchedMovie[];
  @Input() screens!: FetchedScreen[];
  @Output() handleAddShow = new EventEmitter<Show>();
  @Output() handleAddMovie = new EventEmitter<{
    movie: FetchedMovie;
    dateId: number;
  }>();

  private builder = inject(NonNullableFormBuilder);
  private adminPanelService = inject(AdminPanelService);

  showsColliding$$ = new BehaviorSubject<{ showError: boolean }>({
    showError: false,
  });

  addShowForm = this.createForm();
  matcher = new MyErrorStateMatcher();
  today = new Date();
  tomorrow = new Date(this.today.getTime() + 24 * 60 * 60 * 1000);
  first = this.today.getDate() - this.today.getDay() + 1;
  firstDate = new Date(this.today.setDate(this.first));
  lastDate = new Date(this.today.setDate(this.firstDate.getDate() + 6));
  selectedMovieId!: number;
  selectedScreen!: string;
  ticketTypes: TicketType[] = [
    { type: 'Ulgowy' },
    { type: 'Senior' },
    { type: 'Normalny' },
  ];

  addPriceListItem() {
    if (this.addShowForm.controls.priceList.length === 3) return;
    this.addShowForm.controls.priceList.push(this.createPriceListForm());
  }

  removePriceListItem(index: number) {
    if (this.addShowForm.controls.priceList.length === 1) return;
    this.addShowForm.controls.priceList.removeAt(index);
  }

  handleSubmit() {
    let pickedDate = new Date(this.dateIdCtrl.value);
    let day = pickedDate.getUTCDay();

    this.addShowForm.markAllAsTouched();
    if (this.addShowForm.invalid) return;

    const showData = this.addShowForm.getRawValue();
    console.log(showData);
    const { movieId } = showData;
    let movieLength = +movieId.length.split(' ')[0];

    this.adminPanelService
      .isDateAvaible(
        this.hourCtrl.value,
        movieLength,
        day,
        this.screenCtrl.value
      )
      .pipe(take(1))
      .subscribe((result) => {
        if (result === true) {
          this.handleAddMovie.emit({
            movie: movieId,
            dateId: day,
          });
          this.handleAddShow.emit({
            ...showData,
            movieId: movieId.id,
            dateId: day,
            reservedSeats: [],
          });

          this.addShowForm.reset();
          this.addShowForm.markAsUntouched();
          this.showsColliding$$.next({ showError: false });
          console.log('dodano nowy film');
        } else {
          this.showsColliding$$.next({ showError: true });
          console.log('nie dodano nowy film');
          return;
        }
      });
  }

  private createForm() {
    return this.builder.group<AddShowForm>({
      movieId: this.builder.control({} as FetchedMovie, {
        validators: [Validators.required],
      }),
      hour: this.builder.control('', {
        validators: [Validators.required],
      }),
      dateId: this.builder.control('', {
        validators: [Validators.required],
      }),
      screen: this.builder.control('', {
        validators: [Validators.required],
      }),
      priceList: this.builder.array<FormGroup<AddPriceListItem>>([
        this.createPriceListForm(),
      ]),
    });
  }

  private createPriceListForm() {
    return this.builder.group<AddPriceListItem>({
      type: this.builder.control('', {
        validators: [Validators.required],
      }),
      price: this.builder.control(0, {
        validators: [
          Validators.required,
          Validators.min(10),
          Validators.max(50),
        ],
      }),
    });
  }

  get movieIdCtrl() {
    return this.addShowForm.controls.movieId;
  }

  get hourCtrl() {
    return this.addShowForm.controls.hour;
  }

  get dateIdCtrl() {
    return this.addShowForm.controls.dateId;
  }

  get screenCtrl() {
    return this.addShowForm.controls.screen;
  }
  ngOnInit() {
    console.log(this.tomorrow);
  }
}

// nextweek() {
//   let today = new Date();
//   let nextweek = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate() + 6
//   );
//   return nextweek;
// }
