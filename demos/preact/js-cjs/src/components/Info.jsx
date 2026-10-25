import pkg from '../../package.json';

export default function Info() {
  return <>
    <div>Library: Preact</div>
    <div>Language: Javascript (CJS)</div>
    <div>Version: {pkg.dependencies['preact']}</div>
    <div>
      <span>
        Lear more at:&nbsp;
        <a href="https://gobi-tools.github.io/react-srv/" target="_blank">
          https://gobi-tools.github.io/react-srv/
        </a>
      </span>
    </div>
  </>
}