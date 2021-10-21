import React from 'react';
import AuthorizedLayout from './components/layouts/AuthorizedLayout';
import { Switch, Route } from 'react-router-dom';
import { ListCategoryPage, AddEditCategoryPage } from './features/category/pages';
import { ListAuthorPage, AddEditAuthorPage } from './features/author/pages';
import { ListComicPage, AddEditComicPage } from './features/comic/pages';
import { ListChapterPage, AddEditChapterPage } from './features/chapter/pages';
import { ListComicImagePage, AddEditComicImagePage } from './features/comicImage/pages';

function App() {
  return (
    <AuthorizedLayout>
      <Switch>
        <Route path="/comicimage/add">
          <AddEditComicImagePage />
        </Route>
        <Route path="/comicimage/edit/:id">
          <AddEditComicImagePage />
        </Route>
        <Route path="/comicimage">
          <ListComicImagePage />
        </Route>
        <Route path="/chapter/add">
          <AddEditChapterPage />
        </Route>
        <Route path="/chapter/edit/:id">
          <AddEditChapterPage />
        </Route>
        <Route path="/chapter">
          <ListChapterPage />
        </Route>
        <Route path="/comic/add">
          <AddEditComicPage />
        </Route>
        <Route path="/comic/edit/:id">
          <AddEditComicPage />
        </Route>
        <Route path="/comic">
          <ListComicPage />
        </Route>
        <Route path="/author/add">
          <AddEditAuthorPage />
        </Route>
        <Route path="/author/edit/:id">
          <AddEditAuthorPage />
        </Route>
        <Route path="/author">
          <ListAuthorPage />
        </Route>
        <Route path="/category/add">
          <AddEditCategoryPage />
        </Route>
        <Route path="/category/edit/:id">
          <AddEditCategoryPage />
        </Route>
        <Route path="/category">
          <ListCategoryPage />
        </Route>
      </Switch>
    </AuthorizedLayout>
  );
}

export default App;
