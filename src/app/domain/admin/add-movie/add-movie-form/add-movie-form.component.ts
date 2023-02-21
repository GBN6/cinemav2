import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ErrorhandlerService } from 'src/app/core/interceptor/error-handler.service';
import { trimValidator } from 'src/app/shared/validators/input-validator.validator';
import { AddMovieForm, Genre, Movie, Pegi } from '../../admin.interface';

@Component({
  selector: 'app-add-movie-form[genres][pegi]',
  templateUrl: './add-movie-form.component.html',
  styleUrls: ['./add-movie-form.component.scss'],
})
export class AddMovieFormComponent {
  @Input() genres!: Genre[];
  @Input() pegi!: Pegi[];
  @Output() handleSubmitEmit = new EventEmitter<Movie>();

  private errorService = inject(ErrorhandlerService);
  private builder = inject(NonNullableFormBuilder);

  errorHandler$ = this.errorService.error$;
  addMovieForm = this.createForm();

  private addToGenre(genre: Genre) {
    this.genreCtrl.setValue([...this.genreCtrl.value, genre]);
  }

  private removeGenre(genre: Genre) {
    this.genreCtrl.setValue(
      this.genreCtrl.value.filter((value) => value !== genre)
    );
  }

  toggleGenre(genre: Genre) {
    if (this.genreCtrl.value.includes(genre)) {
      this.removeGenre(genre);
    } else {
      this.addToGenre(genre);
    }
  }

  toggle() {
    this.premierCtrl.setValue(!this.premierCtrl.value);
  }

  handleSubmit() {
    this.addMovieForm.markAllAsTouched();
    if (this.addMovieForm.invalid) return;

    const movieData = this.addMovieForm.getRawValue();
    const { genre, length } = movieData;

    if (length !== null) {
      this.handleSubmitEmit.emit({
        ...movieData,
        length: length + ' min',
        genre: genre.join(', '),
      });
      this.addMovieForm.reset();
    }
  }

  private createForm() {
    return this.builder.group<AddMovieForm>({
      img: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.pattern(
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/g
          ),
        ],
      }),
      title: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          trimValidator,
        ],
      }),
      genre: this.builder.control([], {
        validators: [Validators.required],
      }),
      length: this.builder.control(null, {
        validators: [
          Validators.min(20),
          Validators.max(400),
          Validators.required,
        ],
      }),
      ageRest: this.builder.control('', {
        validators: [Validators.required],
      }),
      description: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
          trimValidator,
        ],
      }),
      longDescription: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
          trimValidator,
        ],
      }),
      score: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]/10$'),
          trimValidator,
        ],
      }),
      premier: this.builder.control(false),
    });
  }

  get imgCtrl() {
    return this.addMovieForm.controls.img;
  }

  get titleCtrl() {
    return this.addMovieForm.controls.title;
  }

  get genreCtrl() {
    return this.addMovieForm.controls.genre;
  }

  get lengthCtrl() {
    return this.addMovieForm.controls.length;
  }

  get ageRestCtrl() {
    return this.addMovieForm.controls.ageRest;
  }

  get descriptionCtrl() {
    return this.addMovieForm.controls.description;
  }

  get longDescriptionCtrl() {
    return this.addMovieForm.controls.longDescription;
  }

  get scoreCtrl() {
    return this.addMovieForm.controls.score;
  }

  get premierCtrl() {
    return this.addMovieForm.controls.premier;
  }

  ngOnInit() {}
}
