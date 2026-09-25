import * as React from 'react';
import { useEffect } from 'react';
import { Page } from '../components/Page';
import { Container } from '../components/Container';
import { HeartView } from '../components/HeartView';
import { ListMembersList, ListMembersItem } from '../patterns/ListMembers';

interface Person {
  id: number;
  name: string;
  favorite?: boolean;
}

const data: Person[] = [
  { id: 1, name: 'Marco', favorite: true },
  { id: 2, name: 'Lincoln' },
  { id: 3, name: 'Aya' },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState<Person[]>([]);

  useEffect(() => {
    setFavorites(data);
  }, []);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  function handleFavorite(id: number) {
    const newFavorites = favorites.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );

    setFavorites(newFavorites);
  }

  const favoritedOnly = favorites.filter((item) => item.favorite);

  return (
    <Page title="Favorites">
      <Container>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Initial list</h2>
          <ListMembersList>
            {favorites.map((item) => (
              <ListMembersItem
                key={item.id}
                title={item.name}
                trailing="icon"
                trailingIcon={
                  <HeartView
                    size="small"
                    activated={!!item.favorite}
                    onChange={() => handleFavorite(item.id)}
                    aria-label={
                      item.favorite
                        ? `Remove ${item.name} from favorites`
                        : `Add ${item.name} to favorites`
                    }
                  />
                }
              />
            ))}
          </ListMembersList>
        </section>

        <section>
          <h2 style={{ marginBottom: 16 }}>Favorite list</h2>
          {favoritedOnly.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ListMembersList>
              {favoritedOnly.map((item) => (
                <ListMembersItem key={item.id} title={item.name} />
              ))}
            </ListMembersList>
          )}
        </section>
      </Container>
    </Page>
  );
}
