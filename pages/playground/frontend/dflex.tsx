import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { css } from '@emotion/react';
import { store, DnD } from '@dflex/dnd';
import Playground from '@containers/Playground';
import Utteranc from '@components/common/Utteranc';
import { colors } from '@styles/theme';

const tasks: { id: string; msg: string }[] = [
  { id: 'mtg', msg: 'Meet with Laura' },
  { id: 'meetup', msg: 'Organize weekly meetup' },
  { id: 'gym', msg: 'Hit the gym' },
  { id: 'proj', msg: 'The Rosie Project' },
];

const Task = ({ id, task }: { id: string; task: string }) => {
  let dndEvent: any;

  // This reference enable DFlex to move the element when required.
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Wait until component is mounted to get the reference
    if (liRef) {
      // store.register({ id, ref: liRef.current });
      // All the following inputs work fine:
      // store.register({ ref: ref.current });
      // store.register({ id });
      // store.register({ id, ref: ref.current, depth: 0 });
      store.register({ id, ref: liRef.current, parentID: 'my-first-todo' });
    }
  }, [id, liRef]);

  useEffect(
    () => () => {
      store.unregister(id); // Clear element from the store when unmounted.
    },
    [id],
  );

  const onMouseMove = (e: MouseEvent) => {
    console.log(dndEvent);
    if (dndEvent) {
      const { clientX, clientY } = e;

      // Drag when mouse is moving!
      dndEvent.dragAt(clientX, clientY);
    }
  };

  const onMouseUp = () => {
    if (dndEvent) {
      // This is the end of interactive experience.
      dndEvent.endDragging();
      dndEvent = null;

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  };

  const handleMouseDown: React.MouseEventHandler = (e) => {
    const { button, clientX, clientY } = e;

    // Avoid right mouse click and ensure id
    if (typeof button === 'number' && button === 0) {
      if (id) {
        // Add event listeners to the entire document.
        // Not just the button boundaries.
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);

        // Create DnD instance with no custom options.
        dndEvent = new DnD(
          id,
          {
            x: clientX,
            y: clientY,
          },
          {
            restrictions: {
              container: {
                allowLeavingFromTop: false,
                allowLeavingFromBottom: false,
                allowLeavingFromLeft: true,
                allowLeavingFromRight: false,
              },
            },
          },
        );
      }
    }
  };

  return (
    <li
      ref={liRef}
      id={id}
      css={css`
        border: 1px solid ${colors.lusciousRed};
      `}
      onMouseDown={handleMouseDown}
    >
      {task}
    </li>
  );
};

const Dflex: NextPage = () => {
  useEffect(
    () => () => {
      store.destroy(); // Destroy all elements from the store when unmounted.
    },
    [],
  );

  return (
    <div>
      <Head>
        <meta property="og:title" content="Frontend dflex" />
        <meta property="og:url" content="https://v-log.dev/playground/frontend/dflex/" />
        <meta property="og:image" content="https://d6c63ppcwec2x.cloudfront.net/desk_s.jpg" />
        <meta property="og:description" content="drag and drop library" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Frontend dflex" />
        <meta name="twitter:url" content="https://v-log.dev/playground/frontend/dflex/" />
        <meta name="twitter:image" content="https://d6c63ppcwec2x.cloudfront.net/logo.png" />
        <meta name="twitter:description" content="drag and drop library" />
      </Head>
      <Playground>
        <h1>dflex</h1>
        <section
          css={css`
            margin: 20px;
            padding: 0;
            text-align: left;
            line-height: 1.5;
            white-space: pre-line;
          `}
          id="dflex-section"
        >
          <p>list 왼쪽으로만 item이 벗어날 수 있게 조건 걸림.</p>
          <ul
            id="my-first-todo"
            css={css`
              padding: 0;
              list-style-type: none;
              border: 1px solid black;
            `}
          >
            {tasks.map(({ msg, id }) => (
              <Task key={id} task={msg} id={id} />
            ))}
          </ul>
        </section>
      </Playground>
      <Utteranc />
    </div>
  );
};

export default Dflex;
